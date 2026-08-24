import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { useCart } from "../context/CartContext";

// Local assets imported from src/assets
import mainBannerImg from "../assets/Banner.png";
import menBannerImg from "../assets/Menbanner.jpg";
import womenBannerImg from "../assets/women.jpg";
import hoodedCardiganImg from "../assets/Hooded Dark Chocolate Patchwork Cardigan.jpeg";
import daisyCrochetImg from "../assets/Puffy daisy crochet.jpeg";
import sunflowerImg from "../assets/Sunflower embroidery 🌻.jpeg";

import dealAsset1 from "../assets/66e6aeeec3152c92d24b10fe5084a16d.jpg";
import sideBannerImg from "../assets/side banner.jpg";

import { ProductCardSkeleton, HeroSkeleton, CategoryGridSkeleton } from "../components/Skeletons";
import { fetchProductsApi, fetchBannersApi, fetchPopularCategoriesApi, fetchCategoryBannersApi } from "../service/networkService";

const HomeScreen: React.FC = () => {
  const { addToCart, formatPrice } = useCart();
  const fashionSectionRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hero Sliding Carousel State & Data
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveBanners, setLiveBanners] = useState<any[]>([]);
  const [livePopularCategories, setLivePopularCategories] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [categoryBanners, setCategoryBanners] = useState<any>(null);


  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.allSettled([
      fetchProductsApi().then((data) => {
        if (isMounted && data && data.length > 0) {
          setProductsList(data);
        }
      }).catch((err) => console.warn("HomeScreen products fallback:", err)),

      fetchBannersApi().then((banners) => {
        if (isMounted && banners && banners.length > 0) {
          setLiveBanners(banners.filter((b) => b.active !== false));
        }
      }).catch((err) => console.warn("HomeScreen banners fallback:", err)),

      fetchPopularCategoriesApi().then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          const activeCats = cats.filter(c => c.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 4);
          setLivePopularCategories(activeCats);
        }
      }).catch((err) => console.warn("HomeScreen popular categories fallback:", err)),

      fetchCategoryBannersApi().then((data) => {
        if (isMounted && data) {
          setCategoryBanners(data);
        }
      }).catch((err) => console.warn("HomeScreen category banners fallback:", err))
    ]).finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const defaultHeroSlides = [
    {
      id: 1,
      image: mainBannerImg,
      badge: "Art in Every Stitch",
      title: "Handcrafted Luxury",
      subtitle: "Made with Pure Passion & Organic Yarn",
    },
    {
      id: 2,
      image: menBannerImg,
      badge: "Men's Collection",
      title: "Crochet Overshirts",
      subtitle: "Breathable Vintage Style Crafts",
    },
    {
      id: 3,
      image: womenBannerImg,
      badge: "Women's Collection",
      title: "Signature Cardigans",
      subtitle: "Slow Fashion Heirloom Pieces",
    },
  ];

  const heroSlides = liveBanners.length > 0
    ? liveBanners.map((b, idx) => ({
      id: b.id || idx,
      image: b.imageUrl || mainBannerImg,
      badge: b.badge || "Exclusive Collection",
      title: b.title || "CrochCosmo Luxury",
      subtitle: b.subtitle || "Handcrafted with Love",
      cta: "Shop Now 🛒",
      link: b.linkUrl || "/collections",
    }))
    : defaultHeroSlides;


  // Auto-play timer for Hero Carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // Default Popular Categories list matching user screenshot
  const defaultPopularCategories = [
    { title: "Bag Charms", category: "Accessories", image: hoodedCardiganImg },
    { title: "Blanket Bouquets", category: "Baby Apparel", image: daisyCrochetImg },
    { title: "Book Lovers", category: "Book Lovers", image: dealAsset1 },
    { title: "Bottle Holder", category: "Accessories", image: sunflowerImg },
  ];

  const popularCategories = livePopularCategories.length > 0
    ? livePopularCategories.map((c) => ({
      title: c.title || "Category",
      category: c.categoryName || "Accessories",
      image: c.imageUrl || dealAsset1
    }))
    : defaultPopularCategories;


  // State for Artisanal Fashion section tabs (Accessories, Keychains, Plushies)
  const [fashionTab, setFashionTab] = useState<"accessories" | "keychains" | "plushies">("accessories");

  // State for New Arrivals Filter
  const [newArrivalFilter, setNewArrivalFilter] = useState("Women");

  // Dynamic Banner for Artisanal Fashion Section based on active tab
  const activeFashionBanner =
    fashionTab === "accessories"
      ? categoryBanners?.womenBannerUrl || sideBannerImg
      : fashionTab === "keychains"
        ? categoryBanners?.menBannerUrl || daisyCrochetImg
        : categoryBanners?.babyBannerUrl || womenBannerImg;

  const activeFashionBannerText =
    fashionTab === "accessories"
      ? categoryBanners?.womenBannerTagline || "Artisanal Accessories • Handcrafted Hair Clips, Scrunchies & Bags"
      : fashionTab === "keychains"
        ? categoryBanners?.menBannerTagline || "Crochet Keychains & Gifts • Hand-stitched Charms & Miniatures"
        : categoryBanners?.babyBannerTagline || "Handcrafted Plushies • Soft Huggable Plush Toys & Stuffed Creatures";

  // Target collection link based on active tab
  const activeFashionCategoryLink =
    fashionTab === "accessories"
      ? "/collections?category=Accessories"
      : fashionTab === "keychains"
        ? "/collections?category=Crochet%20Keychains"
        : "/collections?category=Plushies";

  const handleFashionTabChange = (tab: "accessories" | "keychains" | "plushies") => {
    setFashionTab(tab);
    if (fashionSectionRef.current) {
      fashionSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. New Arrivals Data (Dynamic filtering & latest sorting)
  const newArrivalsList = productsList
    .filter((p) => {
      const cat = (p.category || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      if (newArrivalFilter === "Women") return cat.includes("women");
      if (newArrivalFilter === "Men") return cat.includes("men") && !cat.includes("women");
      if (newArrivalFilter === "Accessories") return cat.includes("access") || name.includes("access") || cat.includes("bag") || cat.includes("hair");
      if (newArrivalFilter === "Keychains") return cat.includes("keychain") || name.includes("keychain") || cat.includes("book") || name.includes("book") || cat.includes("gift");
      return true;
    })
    .slice()
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      category: p.category || "Handcrafted",
      price: Number(p.priceUSD ?? p.price ?? 50),
      badge: p.badge || "New Arrival",
      rating: Number(p.rating || 5.0),
      image: p.imageUrl || p.image || hoodedCardiganImg,
    }));

  // 2. Baby Articles Data (Dynamic)
  const babyArticles = productsList
    .filter(p => p.category?.toLowerCase().includes("baby"))
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      price: Number(p.priceUSD ?? p.price ?? 50),
      oldPrice: Number(p.priceUSD ?? p.price ?? 50) * 1.2,
      badge: p.badge || "Baby Collection",
      yarn: p.yarnType || p.yarn || "Soft Merino Blend",
      image: p.imageUrl || p.image || daisyCrochetImg,
    }));

  // 3. Accessories, Keychains & Plushies Data (Dynamic)
  const fashionItems = productsList
    .map(p => {
      const cat = (p.category || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      let tabGroup: "accessories" | "keychains" | "plushies" | "none" = "none";

      if (cat.includes("access") || name.includes("access") || cat.includes("bag") || cat.includes("hair") || cat.includes("hat") || cat.includes("cap")) {
        tabGroup = "accessories";
      } else if (cat.includes("keychain") || name.includes("keychain") || cat.includes("book") || cat.includes("gift")) {
        tabGroup = "keychains";
      } else if (cat.includes("plush") || name.includes("plush") || cat.includes("toy") || name.includes("toy") || cat.includes("amigurumi")) {
        tabGroup = "plushies";
      }

      return {
        id: p.id,
        tabGroup,
        name: p.name,
        price: Number(p.priceUSD ?? p.price ?? 50),
        oldPrice: Number(p.priceUSD ?? p.price ?? 50) * 1.2,
        badge: p.badge || p.category || (tabGroup === "accessories" ? "Accessories" : tabGroup === "keychains" ? "Keychains" : "Plushies"),
        tagline: p.yarnType || p.yarn || "Hand-crocheted organic blend",
        image: p.imageUrl || p.image || hoodedCardiganImg,
      };
    });

  const filteredFashion = fashionItems.filter((item) => item.tabGroup === fashionTab).slice(0, 8);



  return (
    <div className="space-y-20 font-body text-[#1b1c1a] bg-[#fbf9f5] min-h-screen pb-20">

      {/* =========================================================================
          SECTION 1: SLIDING HERO CAROUSEL
         ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 pt-4 sm:pt-6">
        {isLoading ? (
          <div className="w-full">
            <HeroSkeleton />
          </div>
        ) : (
          /* Sliding Hero Panel (Smooth horizontal track animation) */
          <div className="relative w-full overflow-hidden shadow-2xl rounded-3xl bg-[#1b1c1a] group cursor-pointer aspect-[4/3] sm:aspect-[16/10]">

            {/* Smooth Sliding Track Container */}
            <div
              className="flex transition-transform duration-700 ease-in-out w-full h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroSlides.map((slide) => (
                <Link
                  key={slide.id}
                  to={RouteName.COLLECTIONS}
                  className="w-full h-full flex-shrink-0 relative block"
                >
                  <img
                    src={slide.image}
                    alt="Hero Banner"
                    className="w-full h-full object-cover object-center block"
                  />
                </Link>
              ))}
            </div>

            {/* Navigation Controls: Prev / Next Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-white text-white hover:text-[#1b1c1a] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md z-20"
              aria-label="Previous Slide"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-white text-white hover:text-[#1b1c1a] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md z-20"
              aria-label="Next Slide"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? "w-8 bg-[#8e4d31]" : "w-2.5 bg-white/70 hover:bg-white"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 1.5: POPULAR CATEGORIES GRID
         ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 pt-10 space-y-12">
        {/* Popular Categories Grid (Matching User Screenshot design) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1b1c1a]">
              Popular Categories
            </h3>
            <p className="text-xs sm:text-sm text-[#76786f]">
              Click any category to explore curated artisanal collections
            </p>
          </div>

          {isLoading ? (
            <CategoryGridSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.title}
                  to={`/collections?category=${encodeURIComponent(cat.category)}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e4e2de] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f3ef]">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="p-4 bg-[#fbf9f5] border-t border-[#f5f3ef]">
                    <h4 className="font-display text-base font-bold text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors">
                      {cat.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: NEW ARRIVALS ("new arrival")
         ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8">
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
            {["Women", "Men", "Accessories", "Keychains"].map((cat) => (
              <button
                key={cat}
                onClick={() => setNewArrivalFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${newArrivalFilter === cat
                  ? "bg-[#8e4d31] text-white shadow-md"
                  : "bg-white text-[#464840] border border-[#e4e2de] hover:bg-[#f5f3ef]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <ProductCardSkeleton key={n} />
            ))}
          </div>
        ) : newArrivalsList.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl border border-[#e4e2de] space-y-2">
            <span className="material-symbols-outlined text-4xl text-amber-600">inventory_2</span>
            <h3 className="font-display text-lg font-semibold text-[#1b1c1a]">No Stock Right Now</h3>
            <p className="text-xs text-[#76786f]">There are currently no items available in this category. You can add new products from the admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivalsList.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-[#e4e2de] flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f3ef]">
                  <Link to={`/product/${prod.id}`} className="block w-full h-full">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#8e4d31] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm pointer-events-none">
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
                    to={`/product/${prod.id}`}
                    className="font-display text-lg font-semibold text-[#1b1c1a] hover:text-[#8e4d31] transition-colors block line-clamp-1"
                  >
                    {prod.name}
                  </Link>

                  <div className="flex justify-between items-center pt-2 border-t border-[#f5f3ef]">
                    <span className="font-display text-xl font-bold text-[#8e4d31]">
                      {formatPrice(prod.price)}
                    </span>
                    <Link
                      to={`/product/${prod.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hover:underline"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* =========================================================================
          SECTION 3: BABY ARTICLES SECTION ("baby articals")
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#f3f0e8] to-[#fbf9f5] py-16 border-y border-[#e4e2de]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">

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
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <span className="absolute top-3 left-3 bg-[#585e4c] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm pointer-events-none">
                    {item.badge}
                  </span>

                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
                    SAVE {formatPrice(item.oldPrice - item.price)}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-xs font-medium text-[#8e4d31] block">
                    Yarn: {item.yarn}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="font-display text-lg font-semibold text-[#1b1c1a] hover:text-[#8e4d31] transition-colors block line-clamp-1"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f3ef]">
                    <div>
                      <span className="font-display text-xl font-bold text-[#8e4d31]">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through ml-2">
                        {formatPrice(item.oldPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hover:underline"
                      >
                        Details →
                      </Link>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3.5 py-2 bg-[#585e4c] hover:bg-[#717763] text-white text-xs font-bold uppercase rounded-lg transition-all shadow-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: ARTISANAL FASHION WITH DYNAMIC ACCESSORIES, KEYCHAINS & PLUSHIES TABS & BANNERS
         ========================================================================= */}
      <section ref={fashionSectionRef} className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-12 scroll-mt-24">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
            Slow Fashion Heritage
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1b1c1a]">
            Artisanal Fashion
          </h2>
          <p className="text-base text-[#464840] leading-relaxed">
            Discover handcrafted hair accessories, crochet keychains & charms, and luxury plushies.
          </p>

          {/* Category Toggle Tabs */}
          <div className="inline-flex p-1.5 bg-[#eae8e4] rounded-2xl border border-[#e4e2de] mt-4 flex-wrap justify-center gap-1">
            <button
              onClick={() => handleFashionTabChange("accessories")}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${fashionTab === "accessories"
                ? "bg-[#8e4d31] text-white shadow-md"
                : "text-[#464840] hover:text-[#1b1c1a]"
                }`}
            >
              Accessories
            </button>
            <button
              onClick={() => handleFashionTabChange("keychains")}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${fashionTab === "keychains"
                ? "bg-[#8e4d31] text-white shadow-md"
                : "text-[#464840] hover:text-[#1b1c1a]"
                }`}
            >
              Keychains
            </button>
            <button
              onClick={() => handleFashionTabChange("plushies")}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${fashionTab === "plushies"
                ? "bg-[#8e4d31] text-white shadow-md"
                : "text-[#464840] hover:text-[#1b1c1a]"
                }`}
            >
              Plushies
            </button>
          </div>
        </div>

        {/* Dynamic Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#e4e2de] bg-[#1b1c1a] transition-all duration-500">
          <Link
            to={activeFashionCategoryLink}
            className="block relative group cursor-pointer w-full"
          >
            <img
              src={activeFashionBanner}
              alt={`${fashionTab} Banner`}
              className="w-full h-auto block transition-all duration-700 group-hover:scale-[1.01]"
            />
          </Link>
          <div className="bg-[#1b1c1a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#8e4d31]/40 text-white">
            <span className="text-sm font-semibold text-gray-200">
              {activeFashionBannerText}
            </span>
            <Link
              to={activeFashionCategoryLink}
              className="px-6 py-2 bg-[#8e4d31] hover:bg-[#a65b3b] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex-shrink-0"
            >
              Shop {fashionTab === "accessories" ? "Accessories" : fashionTab === "keychains" ? "Keychains" : "Plushies"} Collection →
            </Link>
          </div>
        </div>

        {/* Category Items Grid / Empty State */}
        {filteredFashion.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl border border-[#e4e2de] space-y-2">
            <span className="material-symbols-outlined text-4xl text-amber-600">inventory_2</span>
            <h3 className="font-display text-lg font-semibold text-[#1b1c1a]">No Stock Available Right Now</h3>
            <p className="text-xs text-[#76786f]">There are currently no items added in the {fashionTab === "accessories" ? "Accessories" : fashionTab === "keychains" ? "Keychains" : "Plushies"} category. Products can be added from the admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFashion.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#e4e2de] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#efeeea]">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1b1c1a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm pointer-events-none">
                    {item.badge}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[11px] text-gray-200 block mb-1 font-mono">
                      {item.tagline}
                    </span>
                    <Link to={`/product/${item.id}`} className="pointer-events-auto hover:text-amber-200">
                      <h3 className="font-display text-xl font-bold leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="p-5 flex justify-between items-center bg-white border-t border-[#f5f3ef]">
                  <div>
                    <span className="font-display text-xl font-bold text-[#8e4d31]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatPrice(item.oldPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hover:underline"
                    >
                      Details →
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-2 bg-[#585e4c] hover:bg-[#717763] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* =========================================================================
          SECTION 4.5: OUR HERITAGE (WEAVING STORIES INTO EVERY STITCH)
         ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-12">
        {/* Feature Highlights Bar (Placed directly above 'Weaving Stories Into Every Stitch') */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e4e2de] shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 text-center">
            {/* Worldwide Shipping */}
            <div className="flex flex-col items-center justify-center p-4 space-y-2 md:border-r md:border-[#efeeea]">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#8e4d31]">
                local_shipping
              </span>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#1b1c1a] tracking-wide">
                Worldwide Shipping
              </h4>
              <p className="text-xs sm:text-sm text-[#52544a] font-medium">
                Free shipping on orders over $100
              </p>
            </div>

            {/* 100% Organic Yarns */}
            <div className="flex flex-col items-center justify-center p-4 space-y-2 md:border-r md:border-[#efeeea]">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#8e4d31]">
                eco
              </span>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#1b1c1a] tracking-wide">
                100% Organic Yarns
              </h4>
              <p className="text-xs sm:text-sm text-[#52544a] font-medium">
                Pure merino wool & pima cotton
              </p>
            </div>

            {/* Artisan Empowered */}
            <div className="flex flex-col items-center justify-center p-4 space-y-2 md:border-r md:border-[#efeeea]">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#8e4d31]">
                diversity_1
              </span>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#1b1c1a] tracking-wide">
                Artisan Empowered
              </h4>
              <p className="text-xs sm:text-sm text-[#52544a] font-medium">
                Fair wages for women weavers
              </p>
            </div>

            {/* Lifetime Quality */}
            <div className="flex flex-col items-center justify-center p-4 space-y-2">
              <div className="relative">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#8e4d31]">
                  verified_user
                </span>
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#1b1c1a] tracking-wide">
                Lifetime Quality
              </h4>
              <p className="text-xs sm:text-sm text-[#52544a] font-medium">
                Durable heirloom craftsmanship
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#fcfbf9] p-8 md:p-12 rounded-3xl border border-[#e4e2de]">
          {/* Left Column Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block">
              OUR HERITAGE
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1b1c1a] leading-tight">
              Weaving Stories Into Every Stitch
            </h2>
            <p className="text-sm md:text-base text-[#52544a] leading-relaxed">
              CrochCosmo by Tayyaba was born from a simple belief: true luxury lies in the time, intention, and cosmic inspiration woven into handcrafted art. We are a slow fashion sanctuary dedicated to preserving the delicate craft of crochet while infusing it with modern elegance.
            </p>
            <p className="text-sm md:text-base text-[#52544a] leading-relaxed">
              Every piece in our collection—from our signature sunflower totes to our intricately detailed floral bouquets—is a labor of love. We source only premium, organic yarns, ensuring each creation not only looks breathtaking but feels incredibly soft against the skin and gentle on the earth.
            </p>
            <div className="pt-2">
              <Link
                to={RouteName.COLLECTIONS}
                className="inline-block px-7 py-3.5 bg-[#4c5446] hover:bg-[#3d4438] text-white text-xs font-bold tracking-wider rounded-xl transition-all shadow-md"
              >
                Explore The Collection
              </Link>
            </div>
          </div>

          {/* Right Column Image & Artisanal Badge Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2de]">
              <img
                src={sideBannerImg}
                alt="Weaving Stories Into Every Stitch"
                className="w-full h-auto object-cover max-h-[580px]"
              />
            </div>

            {/* Artisanal Process Overlay Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-8 bg-white p-5 rounded-2xl border border-[#e4e2de] shadow-xl max-w-xs space-y-2 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f5f3ef] flex items-center justify-center text-[#8e4d31]">
                  <span className="material-symbols-outlined text-lg">build</span>
                </div>
                <h4 className="font-display text-sm font-bold text-[#1b1c1a]">Artisanal Process</h4>
              </div>
              <p className="text-xs text-[#76786f] leading-snug">
                Over 40 hours of dedicated craftsmanship go into our signature pieces.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
