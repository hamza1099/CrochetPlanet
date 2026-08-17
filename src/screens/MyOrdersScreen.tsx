import React, { useState } from "react";
import artisanHandsImg from "../assets/side banner.jpg";

export const MyOrdersScreen: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(1);

  const toggleTracking = (orderId: number) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] min-h-screen">
      {/* Page Header */}
      <div className="mb-12 text-center md:text-left max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1b1c1a] mb-4">
          Your Journey
        </h1>
        <p className="text-sm md:text-base text-[#76786f] leading-relaxed">
          Track the progress of your handcrafted pieces. Each stitch takes time, and we appreciate your patience as our artisans create your unique garments.
        </p>
      </div>

      {/* Orders Grid */}
      <div className="space-y-8">
        {/* Order Card 1: Active Tracking */}
        <div className="bg-white rounded-2xl shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 overflow-hidden">
          {/* Order Header (Clickable) */}
          <div
            onClick={() => toggleTracking(1)}
            className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#f5f3ef]/50 transition-colors group"
          >
            <div className="flex flex-col mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-2xl font-semibold text-[#1b1c1a]">
                  Order #CR-9482
                </span>
                <span className="px-3 py-1 bg-[#585e4c]/10 text-[#585e4c] text-[10px] font-bold tracking-widest rounded-xl uppercase">
                  In Progress
                </span>
              </div>
              <span className="text-xs text-[#76786f]">
                Placed on Oct 12, 2026 • 2 items
              </span>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="font-display text-2xl font-bold text-[#1b1c1a]">
                Rs. 14,500
              </span>
              <span
                className={`material-symbols-outlined text-[#76786f] group-hover:text-[#585e4c] transition-transform duration-300 ${
                  expandedOrder === 1 ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Tracking Details Expansion */}
          {expandedOrder === 1 && (
            <div className="bg-[#fbf9f5] border-t border-[#e4e2de]/60 p-6 md:p-12 animate-in fade-in duration-300">
              {/* Progress Stepper Bar */}
              <div className="relative w-full max-w-4xl mx-auto mb-14 mt-4">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 px-4 md:px-8">
                  <div className="h-0.5 w-full bg-[#e4e2de] relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-[#585e4c] transition-all duration-500" />
                  </div>
                </div>

                {/* Steps */}
                <div className="relative z-10 flex justify-between w-full">
                  {/* Step 1: Pending */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-[#585e4c] text-white flex items-center justify-center mb-3 shadow-sm">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hidden md:block">
                      Pending
                    </span>
                  </div>

                  {/* Step 2: Confirmed */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-[#585e4c] text-white flex items-center justify-center mb-3 shadow-sm">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hidden md:block">
                      Confirmed
                    </span>
                  </div>

                  {/* Step 3: In Progress (Active) */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-white flex items-center justify-center mb-3 shadow-[0_0_0_4px_rgba(88,94,76,0.15)]">
                      <div className="w-3 h-3 bg-[#585e4c] rounded-full" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a] hidden md:block">
                      In Progress
                    </span>
                  </div>

                  {/* Step 4: Shipped */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#c7c7bd] bg-white flex items-center justify-center mb-3" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#76786f] hidden md:block">
                      Shipped
                    </span>
                  </div>

                  {/* Step 5: Delivered */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#c7c7bd] bg-white flex items-center justify-center mb-3" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#76786f] hidden md:block">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>

              {/* Artisan Update Card */}
              <div className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start border border-[#e4e2de]">
                <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={artisanHandsImg}
                    alt="Artisan hands crocheting"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                    Artisan Update: Crafting your Cardigan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#76786f] leading-relaxed">
                    Your 'Midnight Bloom' cardigan is currently on the loom. Amina, your artisan, has completed the intricate floral motifs for the sleeves and is now assembling the main body panels. The organic cotton yarn responds beautifully to her experienced tension.
                  </p>
                  <button className="text-[11px] font-bold tracking-widest text-[#585e4c] border-b border-[#585e4c] hover:text-[#8e4d31] hover:border-[#8e4d31] transition-colors uppercase pt-2">
                    READ AMINA'S STORY
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Card 2: Delivered */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de]/60 overflow-hidden">
          <div
            onClick={() => toggleTracking(2)}
            className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#f5f3ef]/50 transition-colors group"
          >
            <div className="flex flex-col mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-2xl font-semibold text-[#1b1c1a]">
                  Order #CR-8102
                </span>
                <span className="px-3 py-1 bg-[#eae8e4] text-[#76786f] text-[10px] font-bold tracking-widest rounded-xl uppercase">
                  Delivered
                </span>
              </div>
              <span className="text-xs text-[#76786f]">
                Placed on Aug 04, 2026 • 1 item
              </span>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="font-display text-2xl font-bold text-[#76786f]">
                Rs. 8,200
              </span>
              <span
                className={`material-symbols-outlined text-[#76786f] group-hover:text-[#585e4c] transition-transform duration-300 ${
                  expandedOrder === 2 ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {expandedOrder === 2 && (
            <div className="bg-[#fbf9f5] border-t border-[#e4e2de]/60 p-8 text-center py-12">
              <span className="material-symbols-outlined text-5xl text-[#877152] mb-3">
                check_circle
              </span>
              <h4 className="font-display text-xl font-semibold text-[#1b1c1a] mb-2">
                Delivered Safely
              </h4>
              <p className="text-xs sm:text-sm text-[#76786f] max-w-md mx-auto mb-6">
                This item was delivered on Aug 22, 2026. We hope it brings warmth and joy to your days.
              </p>
              <button className="px-6 py-3 bg-transparent border border-[#877152] text-[#1b1c1a] rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#eae8e4] transition-colors">
                LEAVE A REVIEW
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersScreen;
