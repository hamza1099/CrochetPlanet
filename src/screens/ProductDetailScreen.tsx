import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { RouteName } from "../routes/RouteName";

const ProductDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState("Beige");
  const [selectedSize, setSelectedSize] = useState("0-3M");
  const [personalization, setPersonalization] = useState("");

  const product = {
    id: id || "sweater-1",
    name: "Artisanal Organic Baby Sweater",
    price: 55.0,
    category: "Baby Apparel",
    badge: "Organic Wool",
    description:
      "Handcrafted with love by our collective of women artisans. Made from 100% locally sourced organic wool, this sweater is incredibly soft, breathable, and designed to gently embrace your little one.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWPIWedTuhLodyUdzPRCyKOH7w56Y35m-epXJSMiLCqUuL1u2WEJaq9Bewr6m6whQEjedSbR6ICQ5uR5sxYa-PPvo0z60gqq2gTv-XXwffZLiPnxYVgIcuu-7ho0w5G1ev9fjK87NaSmKFb6J3no-Atrxfm46G5d01g2-vQKWsqkBZjk-G-Ckks_3dzwWxhxaGLICNFS-EwZtrdwXojxQaO6CYdUxLp0xUmFipOYKO2IAGuFswNfwMvw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1eyA6IVz75Y7_MNTCHOZDRUAXJc4DloL1SALxK_8hGS9FHXrDIcopy633spGmF1FKDmvp5f5Et8BaTCHN12n3izfNBe-ULoiCgkKbGtNT7lox5N5zlRsCReKGJs228gJ6jojxnp7ivOTUnCetX2pbFTFCTwt9YXsGbZ3ROwDzU5-9PrZYWmTPrhoNkbsc1rutKSOsG2ocBLwZ_j0V_c2QZCQMPXJFCdpyQiltjeXdUCJEKDmc3TFvqA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOFJ91drIHta_n64UtbCFpUZGUwpt8DXX0XW5bj-x8cX73L7K9bKLtO9Ct9Kvk6CPKNfT7yMyuMTHHtr-2WH4SPUmyMiiu2k67mXJ2c8MIeUxtz5MenMBNmEZ3JH5XyxtBy6hzHlMY5PO5B_u1bhTjL0X6dDkFNl-lI_PbtPIOf7f0Ec_0pfAjr9_cw3fHqyQrPvuR1uegLrVr34ROZHqK7Q81RhNMh-piTGJNBGChbpVGOtdcbGNwmQ",
    ],
  };

  const [activeImg, setActiveImg] = useState(product.images[0]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 font-body text-[#1b1c1a] space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#76786f] flex items-center gap-2">
        <Link to={RouteName.HOME} className="hover:text-[#8e4d31]">Home</Link>
        <span>/</span>
        <Link to={RouteName.COLLECTIONS} className="hover:text-[#8e4d31]">Collections</Link>
        <span>/</span>
        <span className="text-[#1b1c1a] font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-24 md:w-full md:h-28 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImg === img ? "border-[#8e4d31] opacity-100" : "border-[#e4e2de] opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Active Large Image */}
          <div className="w-full rounded-3xl overflow-hidden bg-[#efeeea] aspect-[4/5] shadow-lg relative">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
            <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#585e4c] shadow-sm">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block mb-2">
              {product.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1b1c1a] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4 text-[#877152] text-sm">
              {"★".repeat(5)}
              <span className="text-xs text-[#76786f] ml-1">(4.9 / 32 reviews)</span>
            </div>
            <p className="font-display text-3xl font-semibold text-[#8e4d31]">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-base text-[#464840] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-3 pt-4 border-t border-[#f5f3ef]">
            <label className="text-xs font-bold uppercase tracking-widest text-[#585e4c] block">
              Color: <span className="text-[#8e4d31] ml-1">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {["Beige", "Oatmeal", "Sage"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedColor === c
                      ? "bg-[#8e4d31] text-white border-[#8e4d31]"
                      : "bg-white text-[#464840] border-[#c7c7bd] hover:border-[#8e4d31]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-[#585e4c] block">
              Size Selection
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["0-3M", "3-6M", "6-12M"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === s
                      ? "bg-[#585e4c] text-white border-[#585e4c]"
                      : "bg-white text-[#464840] border-[#c7c7bd] hover:border-[#585e4c]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Embroidery Personalization */}
          <div className="space-y-2 pt-4 border-t border-[#f5f3ef]">
            <label className="text-xs font-bold uppercase tracking-widest text-[#585e4c] block">
              Hand Embroidery Personalization (Optional)
            </label>
            <input
              type="text"
              maxLength={8}
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value)}
              placeholder="e.g. LUNA (max 8 chars)"
              className="w-full bg-white border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <button
              onClick={() =>
                addToCart({
                  id: `${product.id}-${selectedColor}-${selectedSize}`,
                  name: `${product.name} (${selectedColor}, ${selectedSize})`,
                  price: product.price,
                  image: activeImg,
                  badge: product.badge,
                })
              }
              className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Add to Shopping Bag
            </button>
            <Link
              to={RouteName.CUSTOM_ORDER}
              className="w-full block text-center py-3.5 border-2 border-[#8e4d31] text-[#8e4d31] hover:bg-[#8e4d31] hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              Inquire Custom Version
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="space-y-4 pt-6 border-t border-[#e4e2de] text-xs text-[#464840]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-[#8e4d31]">
                volunteer_activism
              </span>
              <span>100% Handcrafted by empowered women artisans</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-[#585e4c]">
                eco
              </span>
              <span>Organic, hypoallergenic natural yarn & dyes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
