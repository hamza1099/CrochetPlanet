import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { fetchArtisansApi } from "../service/networkService";

const initialArtisans = [
  {
    name: "Zainab Bibi",
    role: "Master Crochet Artisan — 14 Years Experience",
    bio: "Zainab leads our village guild, specializing in delicate heirloom baby blankets and intricate lace cardigans. Through her work, she has funded her children's higher education.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Fatima Noor",
    role: "Amigurumi & Toy Sculptor — 8 Years Experience",
    bio: "Fatima turns pure organic cotton yarn into whimsical amigurumi animals. Her meticulous stitch count ensures each plush toy lasts for generations.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
];

const ArtisansScreen: React.FC = () => {
  const [artisansList, setArtisansList] = useState<any[]>(initialArtisans);

  useEffect(() => {
    fetchArtisansApi()
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((a) => ({
            name: a.name,
            role: a.role || "Artisan",
            bio: a.bio || "",
            image: a.imageUrl || a.image || initialArtisans[0].image,
          }));
          setArtisansList(formatted);
        }
      })
      .catch((err) => console.warn("Using initial artisans fallback:", err));
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a] space-y-16">
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
        {artisansList.map((artisan, idx) => (

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
