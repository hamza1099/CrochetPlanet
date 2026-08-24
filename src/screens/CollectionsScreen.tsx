import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Local assets imported for product showcase
import hoodedCardiganImg from "../assets/Hooded Dark Chocolate Patchwork Cardigan.jpeg";

import { ProductCardSkeleton } from "../components/Skeletons";

import { fetchProductsApi, fetchPopularCategoriesApi } from "../service/networkService";

const OFFICIAL_ADMIN_CATEGORIES = [
  "All",
  "Baby Collection",
  "Women's Fashion",
  "Accessories",
  "Men's Fashion",
  "Amigurumi",
  "Gifts & Home",
  "Crochet Keychains",
  "Book Lovers",
  "Crochet Hair Acc",
  "Garments",
  "Plushies",
  "Blankets",
];

const CollectionsScreen: React.FC = () => {
  const { addToCart, formatPrice } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const productSectionRef = useRef<HTMLDivElement>(null);

  const [productsList, setProductsList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYarn, setSelectedYarn] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  const [categories, setCategories] = useState<string[]>(OFFICIAL_ADMIN_CATEGORIES);
  const [yarnTypes, setYarnTypes] = useState<string[]>(["All"]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const scrollToProducts = () => {
    if (window.innerWidth < 1024 && productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Load products from Firebase API using networkService
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.allSettled([
      fetchProductsApi().then((data) => {
        if (isMounted && data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category || "Handcrafted",
            price: Number(item.priceUSD ?? item.price ?? 50),
            rating: Number(item.rating || 5.0),
            badge: item.badge || "Organic",
            yarn: item.yarnType || item.yarn || "Organic Wool",
            image: item.imageUrl || item.image || hoodedCardiganImg,
          }));
          setProductsList(formatted);

          const uniqueYarns = Array.from(new Set(formatted.map(p => p.yarn))).filter(Boolean).sort() as string[];
          setYarnTypes(["All", ...uniqueYarns]);

          // Extract any extra product categories and merge with official admin categories
          const productCats = formatted.map(p => p.category).filter(Boolean);
          const combinedCats = Array.from(new Set([...OFFICIAL_ADMIN_CATEGORIES, ...productCats])) as string[];
          setCategories(combinedCats);
        } else if (isMounted) {
          setProductsList([]);
        }
      }).catch((err) => {
        console.warn("Error fetching products from Firebase:", err);
        if (isMounted) setProductsList([]);
      }),

      fetchPopularCategoriesApi().then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          const sortedCats = cats
            .filter(c => c.active !== false)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((c: any) => c.categoryName || c.title)
            .filter(Boolean);
            
          const uniqueAdminCats = Array.from(new Set(sortedCats)) as string[];
          if (uniqueAdminCats.length > 0) {
            setCategories(prev => Array.from(new Set([...prev, ...uniqueAdminCats])));
          }
        }
      }).catch((err) => console.warn("Error fetching popular categories for CollectionsScreen:", err))
    ]).finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const catQuery = searchParams.get("category");
    const searchQueryParam = searchParams.get("search");

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    } else {
      setSearchQuery("");
    }

    if (catQuery) {
      if (catQuery.toLowerCase().includes("access")) {
        setSelectedCategory("Accessories");
      } else if (catQuery.toLowerCase().includes("women")) {
        setSelectedCategory("Women's Fashion");
      } else if (catQuery.toLowerCase().includes("men")) {
        setSelectedCategory("Men's Fashion");
      } else if (catQuery.toLowerCase().includes("baby")) {
        setSelectedCategory("Baby Collection");
      } else {
        const matchedCat = categories.find(
          (c) => c.toLowerCase() === catQuery.toLowerCase()
        );
        if (matchedCat) {
          setSelectedCategory(matchedCat);
        }
      }
    }
  }, [searchParams, categories]);

  // Handler for category selection
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      searchParams.set("category", cat);
      setSearchParams(searchParams);
    }
    scrollToProducts();
  };

  const filteredProducts = productsList
    .filter((prod) => {
      if (selectedCategory === "All") return true;
      if (selectedCategory === "Women's Fashion") {
        return prod.category === "Women's Fashion" || prod.category === "Adult Apparel";
      }
      if (selectedCategory === "Men's Fashion") {
        return prod.category === "Men's Fashion" || prod.category === "Adult Apparel";
      }
      if (selectedCategory === "Baby Collection" || selectedCategory === "Baby Apparel") {
        return prod.category === "Baby Collection" || prod.category === "Baby Apparel";
      }
      return prod.category === selectedCategory;
    })
    .filter((prod) => selectedYarn === "All" || prod.yarn === selectedYarn)
    .filter((prod) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.yarn.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });


  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a]">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
          Our Craftsmanship
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          CrochCosmo Collections
        </h1>
        <p className="text-base text-[#464840] leading-relaxed">
          Discover our thoughtfully handcrafted pieces, woven with intention and care. Each item represents hours of artisan dedication.
        </p>
      </header>

      {/* Main Container with Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#e4e2de] shadow-sm h-fit space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-[#f5f3ef]">
            <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
              Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedYarn("All");
                setSearchParams({});
                scrollToProducts();
              }}
              className="text-xs text-[#8e4d31] font-bold uppercase tracking-wider hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#585e4c]">
              Category
            </h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#8e4d31] text-white font-semibold shadow-md"
                      : "text-[#464840] hover:bg-[#f5f3ef]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Yarn Filter */}
          <div className="space-y-3 pt-4 border-t border-[#f5f3ef]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#585e4c]">
              Yarn Type
            </h4>
            <div className="space-y-2">
              {yarnTypes.map((yarn) => (
                <button
                  key={yarn}
                  onClick={() => {
                    setSelectedYarn(yarn);
                    scrollToProducts();
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedYarn === yarn
                      ? "bg-[#585e4c] text-white font-semibold shadow-sm"
                      : "text-[#464840] hover:bg-[#f5f3ef]"
                  }`}
                >
                  {yarn}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main ref={productSectionRef} className="lg:col-span-9 space-y-6 scroll-mt-24">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e4e2de] text-sm">
            <div className="flex flex-wrap items-center gap-2 text-[#76786f]">
              <span>
                Showing <strong className="text-[#1b1c1a]">{filteredProducts.length}</strong> handcrafted pieces
              </span>
              {selectedCategory !== "All" && (
                <span className="font-semibold text-[#8e4d31]">
                  in {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8e4d31]/10 text-[#8e4d31] border border-[#8e4d31]/30 rounded-full text-xs font-semibold">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => {
                      searchParams.delete("search");
                      setSearchParams(searchParams);
                    }}
                    className="hover:text-black font-bold ml-1"
                    title="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#76786f]">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#c7c7bd] rounded-lg px-3 py-1.5 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#8e4d31]"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-[#e4e2de] space-y-3">
              <span className="material-symbols-outlined text-4xl text-amber-600">inventory_2</span>
              <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                Out of Stock / No Products Found
              </h3>
              <p className="text-sm text-[#76786f] max-w-md mx-auto">
                Currently, there are no products listed under {selectedCategory !== "All" ? <strong className="text-[#8e4d31]">"{selectedCategory}"</strong> : "this selection"}. Our artisans are crafting new items for this collection!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedYarn("All");
                  setSearchParams({});
                }}
                className="px-5 py-2.5 bg-[#8e4d31] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md inline-block mt-2 hover:bg-[#723c24]"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#e4e2de]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#efeeea]">
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
                    className="absolute bottom-4 left-4 right-4 bg-[#585e4c] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-[#717763]"
                  >
                    Quick Add
                  </button>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs text-[#76786f] block mb-1">
                      {prod.category} • {prod.yarn}
                    </span>
                    <Link
                      to={`/product/${prod.id}`}
                      className="font-display text-lg font-medium text-[#1b1c1a] hover:text-[#8e4d31] transition-colors line-clamp-1"
                    >
                      {prod.name}
                    </Link>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#f5f3ef]">
                    <span className="font-display text-lg font-semibold text-[#8e4d31]">
                      {formatPrice(prod.price)}
                    </span>
                    <Link
                      to={`/product/${prod.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default CollectionsScreen;
