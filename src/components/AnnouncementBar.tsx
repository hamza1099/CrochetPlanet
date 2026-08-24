import React, { useState, useEffect } from "react";
import { Sparkles, Palette, Clock, Tag, X } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcement_bar_dismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_bar_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#6d3721] via-[#8e4d31] to-[#585e4c] text-white text-xs py-2.5 px-4 shadow-sm border-b border-amber-900/30 relative z-50 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left Sparkles Icon / Decorative Tag (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-200 shrink-0 text-[11px]">
          <Sparkles size={14} className="animate-pulse text-amber-300" />
          <span>Artisan Notice</span>
        </div>

        {/* Center Main Notice Messages */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-y-1 gap-x-4 sm:gap-6 text-center text-[11px] sm:text-xs font-medium">
          {/* Item 1: Custom Colors */}
          <div className="inline-flex items-center gap-1.5">
            <Palette size={13} className="text-amber-200 shrink-0" />
            <span>
              Colors can be customized to your choice!
            </span>
          </div>

          <span className="hidden md:inline text-amber-200/50">•</span>

          {/* Item 2: Working Days */}
          <div className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-amber-200 shrink-0" />
            <span>
              Every order takes <strong className="text-amber-200 font-bold">3–5 working days</strong> to craft
            </span>
          </div>

          <span className="hidden lg:inline text-amber-200/50">•</span>

          {/* Item 3: Price Design Variation */}
          <div className="inline-flex items-center gap-1.5">
            <Tag size={13} className="text-amber-200 shrink-0" />
            <span className="text-amber-100/90">
              Prices may vary depending on size and custom design details
            </span>
          </div>
        </div>

        {/* Right Close / Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg hover:bg-black/20 text-amber-100 hover:text-white transition-colors shrink-0 flex items-center justify-center focus:outline-none"
          title="Dismiss Announcement"
          aria-label="Close Notice Bar"
        >
          <X size={15} />
        </button>

      </div>
    </div>
  );
};

export default AnnouncementBar;
