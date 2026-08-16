import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const artisans = [
  {
    name: "Zainab Bibi",
    role: "Master Crochet Artisan — 14 Years Experience",
    bio: "Zainab leads our village guild, specializing in delicate heirloom baby blankets and intricate lace cardigans. Through her work, she has funded her children's higher education.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnxEX8l_kbLxIdbKqiUoNDL6Xx47pd10soJHrETiIfsuCA7oMwKSu9fHA_W4ZwrlpveZgraRcpVeLtql0N1UBOdVZQO8KJPxZLq8YYYoN0sMr0MABdSgKCRdRq7gtO_-5rKEA0iPpYgjm2B6R91Iq8FfgJ6qxnTHneo34fz0uSplCTUwsMhrHY8IlpeIysOC6PRCU16Sw2w_42sBpMS-8FmLTzGgEuDlxjRoxMN7wsOknpIBfgAPex1g",
  },
  {
    name: "Fatima Noor",
    role: "Amigurumi & Toy Sculptor — 8 Years Experience",
    bio: "Fatima turns pure organic cotton yarn into whimsical amigurumi animals. Her meticulous stitch count ensures each plush toy lasts for generations.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SzjvgC_aP-WxzGAv6vAndhvJ9j4Kn37VZVELrWKWMSulYKbUau2HB0WKnW4PKh1XoRC83ShXi0-RWjArTIhktDmrHsItXfxdrGdMCbCoIHO1GBnKN6yd5xNirwSRxau7K3Apt-hgsC055oxw3CJbM3ciWEYfGtwJBlvksaNkyDATJnLYfnL_STHjoRoIhbreCnNKdRIrbshGCahZFFXrEWx096Jg9aYBo8uXdy-3ZXSB_rKz00reEQ",
  },
];

const ArtisansScreen: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 font-body text-[#1b1c1a] space-y-16">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
          The Hands Behind The Craft
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          Meet Our Local Artisans
        </h1>
        <p className="text-base text-[#464840]">
          Every Yarn & Crochet piece is handcrafted in ethical home-studios by women who earn fair, dignified wages while preserving cultural heritage.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {artisans.map((artisan, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#e4e2de] flex flex-col"
          >
            <div className="h-80 overflow-hidden bg-[#efeeea]">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#1b1c1a]">
                  {artisan.name}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8e4d31] block mt-1">
                  {artisan.role}
                </span>
                <p className="text-sm text-[#464840] leading-relaxed mt-4">
                  {artisan.bio}
                </p>
              </div>
              <Link
                to={RouteName.COLLECTIONS}
                className="text-xs font-bold uppercase tracking-widest text-[#585e4c] hover:underline pt-4 border-t border-[#f5f3ef]"
              >
                View Zainab's Collections →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisansScreen;
