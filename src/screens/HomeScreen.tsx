import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { useCart } from "../context/CartContext";

// Local assets imported from src/assets
import mainBannerImg from "../assets/Banner.png";
import menBannerImg from "../assets/Menbanner.jpg";
import womenBannerImg from "../assets/women.jpg";
import hoodedCardiganImg from "../assets/Hooded Dark Chocolate Patchwork Cardigan.jpeg";
import crochetShirtImg from "../assets/Crochet Shirt, Unisex Shirt, Crochet Overshirt, Crochet Brown Shirt, Knitted Shirt, Handmade Shirt, Knitted Mens Shirt, Vintage Style Shirt.jpeg";
import daisyCrochetImg from "../assets/Puffy daisy crochet.jpeg";
import sunflowerImg from "../assets/Sunflower embroidery 🌻.jpeg";

import dealAsset1 from "../assets/66e6aeeec3152c92d24b10fe5084a16d.jpg";
import dealAsset2 from "../assets/b4d37b644ab42da78f9a3d42a5a8fdbd.jpg";
import dealAsset4 from "../assets/1e395a4512140c8e752d25cdaaff7bd6.jpg";

const HomeScreen: React.FC = () => {
  const { addToCart } = useCart();
  const fashionSectionRef = useRef<HTMLDivElement>(null);

  // State for Gender Tab in Men & Women section (Only Women and Men tabs)
  const [genderTab, setGenderTab] = useState<"women" | "men">("women");

  // State for New Arrivals Filter
  const [newArrivalFilter, setNewArrivalFilter] = useState("All");

  // Dynamic Banner for Men & Women Section based on active tab
  const activeFashionBanner = genderTab === "women" ? womenBannerImg : menBannerImg;

  const activeFashionBannerText =
    genderTab === "women"
      ? "Exclusive Women's Line • Handcrafted Cardigans, Sweaters & Apparel"
      : "Exclusive Men's Line • Vintage Crochet Overshirts & Heavy Knits";

  // Target collection link based on active tab
  const activeFashionCategoryLink =
    genderTab === "women"
      ? "/collections?category=Women"
      : "/collections?category=Men";

  const handleGenderTabChange = (tab: "women" | "men") => {
    setGenderTab(tab);
    if (fashionSectionRef.current) {
      fashionSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. New Arrivals Data
  const newArrivalsList = [
    {
      id: "new-hooded",
      name: "Dark Chocolate Patchwork Cardigan",
      category: "Women",
      price: 185.0,
      badge: "40% OFF",
      rating: 5.0,
      image: hoodedCardiganImg,
    },
    {
      id: "new-shirt",
      name: "Vintage Knitted Unisex Overshirt",
      category: "Men",
      price: 145.0,
      badge: "40% OFF",
      rating: 4.9,
      image: crochetShirtImg,
    },
    {
      id: "new-daisy",
      name: "Puffy Daisy Crochet Sweater",
      category: "Women",
      price: 120.0,
      badge: "Handmade",
      rating: 5.0,
      image: daisyCrochetImg,
    },
    {
      id: "new-sunflower",
      name: "Sunflower Embroidery Baby Blanket",
      category: "Baby",
      price: 95.0,
      badge: "Organic Cotton",
      rating: 4.8,
      image: sunflowerImg,
    },
  ];

  // 2. Baby Articles Data
  const babyArticles = [
    {
      id: "baby-1",
      name: "Sunflower Embroidered Baby Set",
      price: 65.0,
      oldPrice: 85.0,
      badge: "Organic Cotton",
      yarn: "100% Pima Cotton",
      image: sunflowerImg,
    },
    {
      id: "baby-2",
      name: "Puffy Daisy Baby Cardigan",
      price: 55.0,
      oldPrice: 75.0,
      badge: "Hypoallergenic",
      yarn: "Soft Merino Blend",
      image: daisyCrochetImg,
    },
    {
      id: "baby-3",
      name: "Oatmeal Baby Cardigan",
      price: 50.0,
      oldPrice: 70.0,
      badge: "Best Seller",
      yarn: "Natural Wool",
      image: dealAsset1,
    },
    {
      id: "baby-4",
      name: "Heirloom Baby Blanket & Booties",
      price: 110.0,
      oldPrice: 145.0,
      badge: "Hand-Knitted",
      yarn: "Organic Cotton",
      image: dealAsset4,
    },
  ];

  // 3. Men & Women Fashion Apparel Data
  const fashionItems = [
    {
      id: "fw-1",
      gender: "women",
      name: "Hooded Patchwork Cardigan",
      price: 185.0,
      oldPrice: 240.0,
      badge: "Women's Collection",
      tagline: "Heavy knit dark chocolate brown tones",
      image: hoodedCardiganImg,
    },
    {
      id: "fw-2",
      gender: "women",
      name: "Puffy Daisy Hand-Knitted Sweater",
      price: 130.0,
      oldPrice: 165.0,
      badge: "Women's Fashion",
      tagline: "3D textured floral pattern weave",
      image: daisyCrochetImg,
    },
    {
      id: "fm-1",
      gender: "men",
      name: "Vintage Crochet Brown Overshirt",
      price: 145.0,
      oldPrice: 190.0,
      badge: "Men's Collection",
      tagline: "Hand-crocheted striped breathable knit",
      image: crochetShirtImg,
    },
    {
      id: "fm-2",
      gender: "men",
      name: "Exclusive Men's Knit Cardigan",
      price: 175.0,
      oldPrice: 220.0,
      badge: "Men's Wear",
      tagline: "Artisanal natural yarn blend",
      image: dealAsset2,
    },
  ];

  const filteredFashion = fashionItems.filter((item) => item.gender === genderTab);

  // 4. Our Best Articles (Featured Editorial)
  const bestArticles = [
    {
      id: "art-1",
      title: "The Craft Behind the 40% OFF Men & Women Crochet Collection",
      excerpt: "Take an inside look at how our master artisans designed the iconic hooded patchwork cardigan and vintage unisex shirt featured in our latest banner release.",
      author: "Elena Rostova",
      date: "August 16, 2026",
      readTime: "4 min read",
      category: "Feature Story",
      link: RouteName.LEARNING_HUB,
      image: mainBannerImg,
    },
    {
      id: "art-2",
      title: "3D Floral Embroidery: Puffy Daisy & Sunflower Techniques",
      excerpt: "Learn how raised stitch motifs add rich tactile warmth and artisanal beauty to organic cotton baby apparel and adult sweaters.",
      author: "Master Weaver Sophia",
      date: "August 12, 2026",
      readTime: "6 min read",
      category: "Craft Guide",
      link: RouteName.MASTERCLASS,
      image: daisyCrochetImg,
    },
    {
      id: "art-3",
      title: "Why Men's Hand-Crocheted Overshirts Are Trending in 2026",
      excerpt: "From retro vintage aesthetics to modern breathable resort wear, explore why hand-knitted menswear is taking center stage.",
      author: "Marcus Vance",
      date: "August 05, 2026",
      readTime: "5 min read",
      category: "Style & Fashion",
      link: RouteName.ORGANIC_LUXURY,
      image: crochetShirtImg,
    },
  ];

  return (
    <div className="space-y-20 font-body text-[#1b1c1a] bg-[#fbf9f5] min-h-screen pb-20">
      
      {/* =========================================================================
          SECTION 1: HERO SPOTLIGHT (Clean Full Banner.png Display)
         ========================================================================= */}
      <section className="relative max-w-[1280px] mx-auto px-6 md:px-12 pt-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2de]">
          
          {/* Main Clean Banner Image Display */}
          <div className="relative w-full overflow-hidden bg-[#2c2d28]">
            <img
              src={mainBannerImg}
              alt="Exclusive Men & Women Crochet Collection 40% Special Offer"
              className="w-full h-auto object-cover object-center block"
            />
          </div>

          {/* Sleek Under-Banner Action Strip */}
          <div className="bg-[#1b1c1a] text-white px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#8e4d31]/40">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-[#8e4d31] text-white rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                🔥 40% SPECIAL OFFER
              </span>
              <span className="text-xs text-gray-300 font-medium hidden md:inline">
                Direct Seasonal Discount Applied Across Men & Women Collections
              </span>
            </div>

            <Link
              to="/collections?category=Women"
              className="px-6 py-2.5 bg-[#8e4d31] hover:bg-[#a65b3b] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
            >
              Explore 40% Off Items
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-white p-6 rounded-2xl border border-[#e4e2de] shadow-sm text-center">
          <div className="p-3">
            <span className="material-symbols-outlined text-3xl text-[#8e4d31] mb-2">local_shipping</span>
            <h4 className="font-display text-sm font-semibold text-[#1b1c1a]">Worldwide Shipping</h4>
            <p className="text-xs text-[#76786f]">Free shipping on orders over $100</p>
          </div>
          <div className="p-3 border-l border-[#f5f3ef]">
            <span className="material-symbols-outlined text-3xl text-[#8e4d31] mb-2">eco</span>
            <h4 className="font-display text-sm font-semibold text-[#1b1c1a]">100% Organic Yarns</h4>
            <p className="text-xs text-[#76786f]">Pure merino wool & pima cotton</p>
          </div>
          <div className="p-3 border-l border-[#f5f3ef]">
            <span className="material-symbols-outlined text-3xl text-[#8e4d31] mb-2">diversity_1</span>
            <h4 className="font-display text-sm font-semibold text-[#1b1c1a]">Artisan Empowered</h4>
            <p className="text-xs text-[#76786f]">Fair wages for women weavers</p>
          </div>
          <div className="p-3 border-l border-[#f5f3ef]">
            <span className="material-symbols-outlined text-3xl text-[#8e4d31] mb-2">verified_user</span>
            <h4 className="font-display text-sm font-semibold text-[#1b1c1a]">Lifetime Quality</h4>
            <p className="text-xs text-[#76786f]">Durable heirloom craftsmanship</p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: NEW ARRIVALS ("new arrival")
         ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block mb-2">
              Fresh Off The Loom
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1b1c1a]">
              New Arrivals Collection
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Women", "Men", "Baby"].map((cat) => (
              <button
                key={cat}
                onClick={() => setNewArrivalFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  newArrivalFilter === cat
                    ? "bg-[#8e4d31] text-white shadow-md"
                    : "bg-white text-[#464840] border border-[#e4e2de] hover:bg-[#f5f3ef]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivalsList
            .filter((item) => newArrivalFilter === "All" || item.category === newArrivalFilter)
            .map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-[#e4e2de] flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f3ef]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#8e4d31] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {prod.badge}
                  </span>

                  <button
                    onClick={() => addToCart(prod)}
                    className="absolute bottom-4 left-4 right-4 bg-[#585e4c] hover:bg-[#717763] text-[#fbf9f5] text-xs font-bold uppercase tracking-widest py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    Quick Add
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs text-[#76786f]">
                    <span>{prod.category}</span>
                    <span className="flex items-center text-[#8e4d31] font-semibold">
                      ★ {prod.rating}
                    </span>
                  </div>

                  <Link
                    to={`/collections?category=${prod.category}`}
                    className="font-display text-lg font-semibold text-[#1b1c1a] hover:text-[#8e4d31] transition-colors block line-clamp-1"
                  >
                    {prod.name}
                  </Link>

                  <div className="flex justify-between items-center pt-2 border-t border-[#f5f3ef]">
                    <span className="font-display text-xl font-bold text-[#8e4d31]">
                      ${prod.price.toFixed(2)}
                    </span>
                    <Link
                      to={`/collections?category=${prod.category}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hover:underline"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: BABY ARTICLES SECTION ("baby articals")
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#f3f0e8] to-[#fbf9f5] py-16 border-y border-[#e4e2de]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          {/* Header Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 bg-[#8e4d31]/10 text-[#8e4d31] text-xs font-bold uppercase tracking-widest rounded-full">
                Pure & Gentle Care
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1b1c1a]">
                Little Angels Baby Articles
              </h2>
              <p className="text-base text-[#464840] leading-relaxed max-w-2xl">
                Non-toxic, hypoallergenic, and silky soft against sensitive skin. Each baby article is hand-spun using 100% certified organic Pima cotton and fine merino yarn.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/collections?category=Baby"
                className="px-6 py-3.5 bg-[#8e4d31] hover:bg-[#71361d] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all"
              >
                View Full Baby Collection →
              </Link>
            </div>
          </div>

          {/* Baby Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {babyArticles.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e4e2de] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f5f3ef]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#585e4c] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                  
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm">
                    SAVE ${(item.oldPrice - item.price).toFixed(0)}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-xs font-medium text-[#8e4d31] block">
                    Yarn: {item.yarn}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#1b1c1a]">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f3ef]">
                    <div>
                      <span className="font-display text-xl font-bold text-[#8e4d31]">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400 line-through ml-2">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-[#585e4c] hover:bg-[#717763] text-white text-xs font-bold uppercase rounded-lg transition-all shadow-sm"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: MEN AND WOMEN ARTICLES WITH DYNAMIC WOMEN/MEN TABS & BANNERS
         ========================================================================= */}
      <section ref={fashionSectionRef} className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-12 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
            Slow Fashion Heritage
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1b1c1a]">
            Men & Women Artisanal Fashion
          </h2>
          <p className="text-base text-[#464840] leading-relaxed">
            Discover tailored hand-knitted cardigans, structured sweaters, and vintage unisex overshirts.
          </p>

          {/* Gender Toggle Tabs (Women's Wear & Men's Wear Only) */}
          <div className="inline-flex p-1.5 bg-[#eae8e4] rounded-2xl border border-[#e4e2de] mt-4">
            <button
              onClick={() => handleGenderTabChange("women")}
              className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                genderTab === "women"
                  ? "bg-[#8e4d31] text-white shadow-md"
                  : "text-[#464840] hover:text-[#1b1c1a]"
              }`}
            >
              Women's Wear
            </button>
            <button
              onClick={() => handleGenderTabChange("men")}
              className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                genderTab === "men"
                  ? "bg-[#8e4d31] text-white shadow-md"
                  : "text-[#464840] hover:text-[#1b1c1a]"
              }`}
            >
              Men's Wear
            </button>
          </div>
        </div>

        {/* Dynamic Banner (women.jpg for Women, Menbanner.jpg for Men) */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#e4e2de] bg-[#1b1c1a] transition-all duration-500">
          <img
            src={activeFashionBanner}
            alt={`${genderTab === "women" ? "Women's" : "Men's"} Fashion Banner`}
            className="w-full h-auto object-cover transition-all duration-700"
          />
          <div className="bg-[#1b1c1a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#8e4d31]/40 text-white">
            <span className="text-sm font-semibold text-gray-200">
              {activeFashionBannerText}
            </span>
            <Link
              to={activeFashionCategoryLink}
              className="px-6 py-2 bg-[#8e4d31] hover:bg-[#a65b3b] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex-shrink-0"
            >
              Shop {genderTab === "women" ? "Women's" : "Men's"} Collection →
            </Link>
          </div>
        </div>

        {/* Fashion Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFashion.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#e4e2de] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#efeeea]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1b1c1a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] text-gray-200 block mb-1 font-mono">
                    {item.tagline}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex justify-between items-center bg-white border-t border-[#f5f3ef]">
                <div>
                  <span className="font-display text-xl font-bold text-[#8e4d31]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 line-through ml-2">
                    ${item.oldPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2.5 bg-[#585e4c] hover:bg-[#717763] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 5: OUR BEST ARTICLES ("our best articals")
         ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="bg-[#eae8e4] rounded-3xl p-8 md:p-14 border border-[#e4e2de] shadow-inner space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#c7c7bd]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block mb-2">
                Knowledge & Editorial Journal
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1b1c1a]">
                Our Best Articles & Guides
              </h2>
            </div>
            <Link
              to={RouteName.LEARNING_HUB}
              className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] border-b-2 border-[#8e4d31] pb-1 hover:text-[#71361d] hover:border-[#71361d] transition-colors"
            >
              Explore All Journal Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e4e2de] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#efeeea]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#8e4d31] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#76786f]">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-[#464840] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center border-t border-[#f5f3ef] mt-4">
                  <span className="text-xs font-medium text-[#76786f]">
                    By {article.author}
                  </span>
                  <Link
                    to={article.link}
                    className="text-xs font-bold uppercase tracking-wider text-[#8e4d31] hover:underline"
                  >
                    Read Full →
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeScreen;
