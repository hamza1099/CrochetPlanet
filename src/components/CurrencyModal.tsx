import React, { useState, useEffect } from "react";
import { useCart, type Currency } from "../context/CartContext";

export const CurrencyModal: React.FC = () => {
  const { currency, setCurrency } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already chosen a currency preference
    const hasChosen = localStorage.getItem("croch_currency_selected");
    if (!hasChosen) {
      setIsOpen(true);
    }
  }, []);

  const handleSelect = (selected: Currency) => {
    setCurrency(selected);
    localStorage.setItem("croch_currency_selected", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#fbf9f5] w-full max-w-md rounded-3xl shadow-2xl p-8 border border-[#e4e2de] text-center space-y-6 animate-in zoom-in-95 duration-300 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#8e4d31]" />

        {/* Icon & Title */}
        <div className="w-16 h-16 bg-[#8e4d31]/10 text-[#8e4d31] rounded-2xl flex items-center justify-center mx-auto mb-2">
          <span className="material-symbols-outlined text-3xl">payments</span>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e4d31]">
            Welcome to CrochCosmo
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#1b1c1a]">
            Choose Your Currency
          </h2>
          <p className="text-xs md:text-sm text-[#76786f] leading-relaxed">
            Please select how you would like to view product prices across our luxury crochet boutique.
          </p>
        </div>

        {/* Currency Options */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => handleSelect("PKR")}
            className={`p-5 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm group hover:scale-[1.02] ${
              currency === "PKR"
                ? "bg-[#585e4c] text-white border-[#585e4c] ring-2 ring-[#585e4c]/30"
                : "bg-white text-[#1b1c1a] border-[#c7c7bd] hover:border-[#8e4d31]"
            }`}
          >
            <span className="text-2xl font-bold">Rs.</span>
            <div>
              <p className="font-bold text-sm">Pakistani Rupee</p>
              <span className={`text-[10px] uppercase tracking-wider ${currency === "PKR" ? "text-white/80" : "text-[#76786f]"}`}>
                PKR (Local Transfers)
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelect("USD")}
            className={`p-5 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm group hover:scale-[1.02] ${
              currency === "USD"
                ? "bg-[#585e4c] text-white border-[#585e4c] ring-2 ring-[#585e4c]/30"
                : "bg-white text-[#1b1c1a] border-[#c7c7bd] hover:border-[#8e4d31]"
            }`}
          >
            <span className="text-2xl font-bold">$</span>
            <div>
              <p className="font-bold text-sm">US Dollar</p>
              <span className={`text-[10px] uppercase tracking-wider ${currency === "USD" ? "text-white/80" : "text-[#76786f]"}`}>
                USD (Worldwide)
              </span>
            </div>
          </button>
        </div>

        <p className="text-[11px] text-[#76786f] italic">
          You can change your preferred currency anytime from the top navigation bar.
        </p>
      </div>
    </div>
  );
};
