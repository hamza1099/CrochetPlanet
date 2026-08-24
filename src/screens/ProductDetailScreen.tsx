import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { RouteName } from "../routes/RouteName";
import { fetchProductByIdApi, fetchProductsApi } from "../service/networkService";

const ProductDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, formatPrice } = useCart();

  const [selectedColor, setSelectedColor] = useState("Beige");
  const [customColorText, setCustomColorText] = useState("");
  const [selectedSize, setSelectedSize] = useState("0-3M");
  const [personalization, setPersonalization] = useState("");

  const defaultProduct = {
    id: id || "baby-sweater-1",
    name: "Artisanal Organic Baby Sweater",
    price: 55.0,
    category: "Baby Apparel",
    badge: "Organic Wool",
    description:
      "Handcrafted with love by our collective of women artisans. Made from 100% locally sourced organic wool, this sweater is incredibly soft, breathable, and designed to gently embrace your little one.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Beige", "Oatmeal", "Sage"],
    sizes: ["0-3M", "3-6M", "6-12M"]
  };

  const [productData, setProductData] = useState<any>(defaultProduct);
  const [activeImg, setActiveImg] = useState<string>(defaultProduct.images[0]);

  useEffect(() => {
    if (!id) return;
    fetchProductByIdApi(id)
      .then((data) => {
        if (data && data.name) {
          const imgs = data.images && data.images.length > 0 ? data.images : [data.imageUrl || defaultProduct.images[0]];
          const availableColors = data.colors && data.colors.length > 0 ? data.colors : ["Beige", "Oatmeal", "Sage"];
          const availableSizes = data.sizes && data.sizes.length > 0 ? data.sizes : ["0-3M", "3-6M", "6-12M"];

          setProductData({
            id: data.id,
            name: data.name,
            price: Number(data.priceUSD ?? data.price ?? 55.0),
            category: data.category || "Baby Apparel",
            badge: data.badge || "Handcrafted",
            description: data.description || defaultProduct.description,
            images: imgs,
            colors: availableColors,
            sizes: availableSizes
          });
          setActiveImg(imgs[0]);
          if (availableColors[0]) setSelectedColor(availableColors[0]);
          if (availableSizes[0]) setSelectedSize(availableSizes[0]);
        }
      })
      .catch(() => {
        fetchProductsApi().then((list) => {
          const found = list.find((p) => p.id === id);
          if (found) {
            const imgs = found.images && found.images.length > 0 ? found.images : [found.imageUrl || defaultProduct.images[0]];
            const availableColors = found.colors && found.colors.length > 0 ? found.colors : ["Beige", "Oatmeal", "Sage"];
            const availableSizes = found.sizes && found.sizes.length > 0 ? found.sizes : ["0-3M", "3-6M", "6-12M"];
            setProductData({
              id: found.id,
              name: found.name,
              price: Number(found.priceUSD ?? found.price ?? 55.0),
              category: found.category || "Baby Apparel",
              badge: found.badge || "Handcrafted",
              description: found.description || defaultProduct.description,
              images: imgs,
              colors: availableColors,
              sizes: availableSizes
            });
            setActiveImg(imgs[0]);
            if (availableColors[0]) setSelectedColor(availableColors[0]);
            if (availableSizes[0]) setSelectedSize(availableSizes[0]);
          }
        }).catch(() => {});
      });
  }, [id]);

  const product = productData;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] space-y-16">
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
            {product.images.map((img: string, idx: number) => (
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
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-base text-[#464840] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-3 pt-4 border-t border-[#f5f3ef]">
            <label className="text-xs font-bold uppercase tracking-widest text-[#585e4c] block">
              Color: <span className="text-[#8e4d31] ml-1 font-bold">{selectedColor === "Custom Color" && customColorText ? `Custom (${customColorText})` : selectedColor || "Standard"}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {(product.colors && product.colors.length > 0 ? product.colors : ["Beige", "Oatmeal", "Sage"]).map((c: string) => (
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

              {/* Custom Color Request Button */}
              {!product.colors?.includes("Custom Color") && (
                <button
                  onClick={() => setSelectedColor("Custom Color")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                    selectedColor === "Custom Color"
                      ? "bg-[#8e4d31] text-white border-[#8e4d31]"
                      : "bg-amber-50 text-[#8e4d31] border-amber-300 hover:border-[#8e4d31]"
                  }`}
                >
                  + Custom Shade
                </button>
              )}
            </div>

            {/* Custom Color Text Input */}
            {selectedColor === "Custom Color" && (
              <div className="pt-2 space-y-1">
                <label className="text-[11px] font-bold text-[#8e4d31] block">
                  🎨 Specify your custom color shade:
                </label>
                <input
                  type="text"
                  value={customColorText}
                  onChange={(e) => setCustomColorText(e.target.value)}
                  placeholder="e.g. Pastel Pink, Olive Green, Sky Blue..."
                  className="w-full bg-[#fcfbfa] border border-[#8e4d31] rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-[#585e4c] block">
              Size Selection: <span className="text-[#585e4c] ml-1 font-bold">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {(product.sizes && product.sizes.length > 0 ? product.sizes : ["0-3M", "3-6M", "6-12M"]).map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
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
              onClick={() => {
                const finalColor = selectedColor === "Custom Color" ? (customColorText ? `Custom (${customColorText})` : "Custom Shade") : selectedColor;
                addToCart({
                  id: `${product.id}-${finalColor}-${selectedSize}`,
                  name: `${product.name} (${finalColor}${selectedSize ? `, ${selectedSize}` : ""}${personalization ? `, Embroidery: "${personalization}"` : ""})`,
                  price: product.price,
                  image: activeImg,
                  badge: product.badge,
                });
              }}
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

          {/* Trust Highlights & Customization Notice */}
          <div className="space-y-4 pt-6 border-t border-[#e4e2de] text-xs text-[#464840]">
            {/* Customization & Crafting Notice Box */}
            <div className="bg-[#f8f6f0] border border-amber-300/70 rounded-2xl p-4 space-y-2 text-xs text-[#464840]">
              <div className="flex items-center gap-2 text-[#8e4d31] font-bold uppercase tracking-wider text-[11px]">
                <span className="material-symbols-outlined text-base">info</span>
                Bespoke Order & Crafting Guidelines
              </div>
              <p className="leading-relaxed text-[11.5px]">
                🎨 <strong>Custom Colors:</strong> Colors can be fully customized to your preference!
              </p>
              <p className="leading-relaxed text-[11.5px]">
                ⏱️ <strong>Crafting Time:</strong> Every order takes <strong>3–5 working days</strong> to carefully handcraft.
              </p>
              <p className="leading-relaxed text-[11.5px]">
                🏷️ <strong>Custom Design Pricing:</strong> Prices may vary depending on size and custom design details.
              </p>
            </div>

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
