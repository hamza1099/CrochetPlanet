import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import logoImg from "../assets/Logo.jpg";

export const AuthModalScreen: React.FC = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    // Navigate to profile dashboard after login
    navigate(RouteName.PROFILE);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#fbf9f5]">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0px_12px_32px_rgba(140,146,125,0.08)] p-8 relative overflow-hidden border border-[#e4e2de]">
        {/* Subtle decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#dfe5cd] opacity-30 rounded-full blur-3xl pointer-events-none" />

        {/* Header / Logo Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white p-2 rounded-2xl border border-[#e4e2de] shadow-sm mb-6 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Crochet Artisans Logo"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1b1c1a] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#76786f] text-center max-w-xs leading-relaxed">
            Enter your mobile number to receive a secure login code.
          </p>
        </div>

        {/* Step 1: Phone Number Input */}
        {step === "phone" ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="mobile-number"
                className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-2 uppercase"
              >
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#76786f] text-sm font-semibold">
                  +1
                </span>
                <input
                  id="mobile-number"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] focus:ring-1 focus:ring-[#585e4c] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#1b1c1a] placeholder-[#76786f] outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep("otp")}
              className="w-full bg-[#585e4c] hover:bg-[#717763] text-white font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <span>Get OTP</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        ) : (
          /* Step 2: OTP Verification */
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
                  id={`otp-input-${idx}`}
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
              Verify & Login
            </button>

            <p className="text-center text-xs text-[#76786f] mt-4">
              Didn't receive a code?{" "}
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="text-[#8e4d31] font-bold hover:underline ml-1"
              >
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModalScreen;
