import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RouteName } from "../routes/RouteName";
import logoImg from "../assets/Logo.jpg";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../service/firebaseClient";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, sendOtp, verifyOtp, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"phone" | "otp" | "name">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isAuthModalOpen) return null;

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 6) {
      setErrorMsg("Please enter a valid mobile number");
      return;
    }
    setErrorMsg("");
    
    let cleanPhone = phoneNumber.trim().replace(/^0+/, "");
    const fullPhone = `${countryCode}${cleanPhone}`;
    
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      await sendOtp(fullPhone, appVerifier);
      setStep("otp");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send OTP. Please try again.");
    }
  };


  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`modal-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`modal-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setErrorMsg("Please enter the 6-digit code.");
      return;
    }
    setErrorMsg("");
    
    let cleanPhone = phoneNumber.trim().replace(/^0+/, "");
    const fullPhone = `${countryCode}${cleanPhone}`;
    
    const success = await verifyOtp(fullPhone, enteredOtp, "");
    if (success) {
      setStep("name");
    } else {
      setErrorMsg("Invalid OTP code. Please enter the code received.");
    }
  };

  const handleCompleteLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fullName.trim().length > 0) {
      await updateProfile({ name: fullName });
    }
    
    closeAuthModal();
    const redirect = localStorage.getItem("redirectAfterLogin");
    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirect);
    } else {
      navigate(RouteName.PROFILE);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0px_12px_32px_rgba(140,146,125,0.08)] p-8 relative overflow-hidden border border-[#e4e2de]">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] flex items-center justify-center transition-colors z-10"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header / Logo Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white p-2 rounded-2xl border border-[#e4e2de] shadow-sm mb-6 flex items-center justify-center">
            <img
              src={logoImg}
              alt="CrochCosmo Logo"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1b1c1a] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#76786f] text-center max-w-xs leading-relaxed">
            {step === "phone" && "Enter your mobile number to receive a secure login code."}
            {step === "otp" && `Enter 6-digit code sent to ${countryCode} ${phoneNumber}`}
            {step === "name" && "Enter your name to complete your profile."}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div id="recaptcha-container"></div>

        {/* Step 1: Phone Number Input */}
        {step === "phone" && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="modal-mobile-number"
                className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-2 uppercase"
              >
                Mobile Number
              </label>
              <div className="relative flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-3 py-3.5 text-sm font-semibold text-[#1b1c1a] outline-none"
                >
                  <option value="+92">+92 (PK)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+971">+971 (UAE)</option>
                </select>
                <input
                  id="modal-mobile-number"
                  type="tel"
                  placeholder="(300) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] focus:ring-1 focus:ring-[#585e4c] rounded-xl py-3.5 px-4 text-sm text-[#1b1c1a] placeholder-[#76786f] outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-[#585e4c] hover:bg-[#717763] text-white font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <span>Get OTP</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="space-y-6">


            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold tracking-widest text-[#76786f] uppercase">
                Enter 6-Digit Code
              </label>
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="text-[#8e4d31] text-xs font-bold hover:underline uppercase transition-all"
              >
                Edit Number
              </button>
            </div>

            <div className="flex gap-2 justify-between">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`modal-otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 text-center bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] focus:ring-1 focus:ring-[#585e4c] rounded-xl font-display text-lg font-bold text-[#1b1c1a] outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerify}
              className="w-full bg-[#585e4c] hover:bg-[#717763] text-white font-medium py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md mt-6"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Step 3: Name Entry */}
        {step === "name" && (
          <form onSubmit={handleCompleteLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-2 uppercase">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tayyaba Hamza"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl py-3.5 px-4 text-sm text-[#1b1c1a] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8e4d31] hover:bg-[#71361d] text-white font-medium py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md"
            >
              Complete Login →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
