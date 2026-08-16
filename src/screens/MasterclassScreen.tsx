import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const MasterclassScreen: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 font-body text-[#1b1c1a] space-y-12">
      {/* Hero Section: Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Imagery Bento Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="col-span-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg relative group bg-[#efeeea]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA45Hl3YEi4cUCrEpURpTHB9z6H8SUqbpeUktEnv2Xvftol77kWxleJAgj4ogW_x6iVAloQLSEgDhn6GRP9EWehCjQjq2hbRYl10VgzNJofvBwbeXDzm6_nQaYF4dTUybtr-JZ7GTpUjHlq8ct1eLWUDssVXN-WOAd-pWc5d-I7ysvFELhwuMeLjTaYXJfuK13Pju9DskUmLlz-zUqWSPPgj7cTpIOWvb3C9dHditJ76rYgnG4A1AhSBw"
              alt="The Heirloom Cardigan"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative group bg-[#efeeea]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXJa_yNLvOCNiesznT9O1vwLUplqgVaA5XLs4cli9RkUR16BnDMVFJ2MZfwP8J61FgB07Lem56QWxycll-24ZWS__GmZpKYgo-CIXcLp2zilt0gKh2jZMcjQVDVyoV2UmcpnsH3gGTNdGX1ZSmpcYDWtgodsoq9HjGnkZPRQDOXwhllmp8AqtkQNTOsqhwzOzzLN1oum7ffuFmxibL7uj_b6nwVRVXoZFzoauZxKTkW9Bu4kdEDxmGew"
              alt="Stitch Detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative group bg-[#efeeea]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXeL5fFzj0awaxSynoTSeyFBmXZNdeWmuncLBnJdk953BYH6wevYeKX1uWcCWf8fti8jT5JmeYeCHMubnHolm-DGiykA5SD2yyaxmSH3NPeFncUiUxWXBB5xFOaUS_TepVKDSV2BRYuBGBrCk_vUZo0xzY2EJXA_A1XXuIvJ3GLXNC8QvrBmAHBGqS2WOBiqCGHWVGUrRtdLQzM5gYs2zRd7V9IHab0W-K9uqmmaZrd8On6GQBCKZiHQ"
              alt="The Artisan Elena"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column: Masterclass Details & Booking Form */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#76786f]">
            <Link to={RouteName.LEARNING_HUB} className="hover:text-[#8e4d31]">
              Learning Hub
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#585e4c] font-semibold">Masterclasses</span>
          </nav>

          {/* Title & Metadata */}
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold text-[#1b1c1a] leading-tight mb-4">
              The Heirloom Cardigan
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-full bg-[#efeeea] text-[#585e4c] text-xs font-bold uppercase tracking-widest">
                Advanced
              </span>
              <span className="px-4 py-1 rounded-full bg-[#585e4c]/10 text-[#585e4c] text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span> 3 Sessions
              </span>
            </div>

            <div className="font-display text-2xl font-semibold text-[#8e4d31]">
              Starting from $145 USD
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-[#464840] leading-relaxed space-y-3">
            <p>
              Immerse yourself in the art of intricate garment construction. The Heirloom Cardigan is a testament to slow fashion, featuring complex cabling, delicate shell motifs, and seamless shaping techniques.
            </p>
            <p>
              In this 1-on-1 private masterclass series, you will be guided personally by our master artisan, Elena, to create a bespoke piece that transcends trends.
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8 border border-[#e4e2de] shadow-md space-y-6">
            <h3 className="font-display text-xl font-semibold text-[#1b1c1a] pb-4 border-b border-[#e4e2de]">
              Request a Booking
            </h3>

            {submitted ? (
              <div className="text-center py-8 space-y-3 bg-white rounded-xl p-6 border border-[#c7c7bd]">
                <span className="material-symbols-outlined text-4xl text-[#585e4c]">
                  check_circle
                </span>
                <h4 className="font-display text-xl font-semibold text-[#1b1c1a]">
                  Booking Request Submitted!
                </h4>
                <p className="text-xs text-[#464840]">
                  Thank you! Artisan Elena will review your schedule and respond via email within 24 hours to confirm your dates.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2 bg-[#8e4d31] text-white rounded-lg text-xs font-bold uppercase tracking-widest"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                    Preferred Start Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-white border border-[#c7c7bd] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                    Current Skill Level
                  </label>
                  <select className="w-full bg-white border border-[#c7c7bd] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]">
                    <option>Intermediate (Comfortable with shaping)</option>
                    <option>Advanced (Ready for complex charts)</option>
                    <option>Expert (Looking for design nuances)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                    Goals for this Masterclass
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell Elena what you hope to achieve..."
                    className="w-full bg-white border border-[#c7c7bd] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Submit Request
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <p className="text-center text-xs text-[#76786f]">
                  You won't be charged until the artisan confirms the dates.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterclassScreen;
