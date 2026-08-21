import React, { createContext, useContext, useState, useEffect } from "react";
import { sendOtpApi, verifyOtpApi, updateUserProfileApi } from "../service/networkService";
import { auth } from "../service/firebaseClient";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";

export interface UserProfile {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  sendOtp: (phoneOrEmail: string, appVerifier?: RecaptchaVerifier) => Promise<string>;
  verifyOtp: (phoneOrEmail: string, otpInput: string, name?: string, email?: string) => Promise<boolean>;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  generatedOtp: string | null;
  confirmationResult: ConfirmationResult | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "crochcosmo_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setGeneratedOtp(null);
    setConfirmationResult(null);
  };

  const sendOtp = async (phoneOrEmail: string, appVerifier?: RecaptchaVerifier): Promise<string> => {
    try {
      if (appVerifier) {
        const result = await signInWithPhoneNumber(auth, phoneOrEmail, appVerifier);
        setConfirmationResult(result);
        return "sent";
      } else {
        // Fallback or old mock logic if no appVerifier provided
        const data = await sendOtpApi(phoneOrEmail);
        const code = data.otpCode || "123456";
        setGeneratedOtp(code);
        return code;
      }
    } catch (err) {
      console.error("Firebase sendOtp error:", err);
      throw err;
    }
  };

  const verifyOtp = async (
    phoneOrEmail: string,
    otpInput: string,
    name?: string,
    email?: string
  ): Promise<boolean> => {
    try {
      if (confirmationResult) {
        const result = await confirmationResult.confirm(otpInput);
        const fbUser = result.user;
        
        const loggedUser: UserProfile = {
          id: fbUser.uid,
          name: name || `Customer ${phoneOrEmail.slice(-4)}`,
          phone: fbUser.phoneNumber || phoneOrEmail,
          email: email || "",
          address: "",
          city: ""
        };
        
        setUser(loggedUser);
        
        // Save to backend optionally
        try {
          await updateUserProfileApi({ userId: fbUser.uid, ...loggedUser });
        } catch (e) {
          console.warn("Could not save to backend on first login", e);
        }
        
        return true;
      } else {
        // Fallback for mock verify
        const data = await verifyOtpApi({ phoneOrEmail, otpCode: otpInput, name });
        if (data.success && data.user) {
          const u = data.user;
          const loggedUser: UserProfile = {
            id: u.id,
            name: u.name || name || `Customer ${phoneOrEmail.slice(-4)}`,
            phone: u.phone || phoneOrEmail,
            email: u.email || email || "",
            address: u.address || "",
            city: u.city || ""
          };
          setUser(loggedUser);
          if (data.token) {
            (globalThis as any).authToken = data.token;
          }
          return true;
        }
        return false;
      }
    } catch (err) {
      console.error("verifyOtp error:", err);
      return false;
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...updatedData } : null;
      if (updated && updated.id) {
        updateUserProfileApi({ userId: updated.id, ...updatedData }).catch(console.warn);
      }
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    (globalThis as any).authToken = undefined;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        sendOtp,
        verifyOtp,
        updateProfile,
        logout,
        generatedOtp,
        confirmationResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
