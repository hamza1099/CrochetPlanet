import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const OrganicLuxuryScreen: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a] space-y-16">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
          Purity & Material Excellence
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          Organic Wool & Care Guide
        </h1>
        <p className="text-base text-[#464840]">
          We select only 100% GOTS certified organic wool and un-dyed Pima cotton for absolute softness and zero synthetic toxins.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#e4e2de] shadow-sm space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#585e4c]">
            eco
          </span>
          <h3 className="font-display text-2xl font-semibold">
            Pure Organic Wool
          </h3>
          <p className="text-sm text-[#464840] leading-relaxed">
            Sourced ethically from local high-altitude pastures where sheep graze freely. Naturally hypoallergenic and self-regulating in temperature.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#e4e2de] shadow-sm space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#8e4d31]">
            water_drop
          </span>
          <h3 className="font-display text-2xl font-semibold">
            Botanical Dyeing
          </h3>
          <p className="text-sm text-[#464840] leading-relaxed">
            Colored using natural botanical extracts from walnut shells, madder root, indigo, and marigold flowers. Gentle on sensitive baby skin.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#e4e2de] shadow-sm space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#877152]">
            local_laundry_service
          </span>
          <h3 className="font-display text-2xl font-semibold">
            Artisanal Care Guide
          </h3>
          <p className="text-sm text-[#464840] leading-relaxed">
            Hand wash gently in lukewarm water with mild wool detergent. Gently press out excess water and lay flat to dry in shade.
          </p>
        </div>
      </div>

      <div className="text-center pt-8">
        <Link
          to={RouteName.COLLECTIONS}
          className="inline-block px-8 py-4 bg-[#585e4c] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#717763] transition-all shadow-md"
        >
          Explore Organic Collection
        </Link>
      </div>
    </div>
  );
};

export default OrganicLuxuryScreen;
