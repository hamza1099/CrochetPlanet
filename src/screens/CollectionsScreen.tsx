import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Local assets imported for product showcase
import hoodedCardiganImg from "../assets/Hooded Dark Chocolate Patchwork Cardigan.jpeg";
import crochetShirtImg from "../assets/Crochet Shirt, Unisex Shirt, Crochet Overshirt, Crochet Brown Shirt, Knitted Shirt, Handmade Shirt, Knitted Mens Shirt, Vintage Style Shirt.jpeg";
import daisyCrochetImg from "../assets/Puffy daisy crochet.jpeg";
import sunflowerImg from "../assets/Sunflower embroidery 🌻.jpeg";
import dealAsset1 from "../assets/66e6aeeec3152c92d24b10fe5084a16d.jpg";
import dealAsset2 from "../assets/b4d37b644ab42da78f9a3d42a5a8fdbd.jpg";
import dealAsset3 from "../assets/00e8740777397293dda3482477592c66.jpg";
import dealAsset4 from "../assets/1e395a4512140c8e752d25cdaaff7bd6.jpg";

const allProducts = [
  {
    id: "fw-1",
    name: "Hooded Dark Chocolate Patchwork Cardigan",
    category: "Women's Fashion",
    price: 185.0,
    rating: 5.0,
    badge: "Women's Collection",
    yarn: "Organic Wool",
    image: hoodedCardiganImg,
  },
  {
    id: "fw-2",
    name: "Puffy Daisy Hand-Knitted Sweater",
    category: "Women's Fashion",
    price: 130.0,
    rating: 5.0,
    badge: "Women's Collection",
    yarn: "Merino Blend",
    image: daisyCrochetImg,
  },
  {
    id: "fw-3",
    name: "Artisanal Floral Crochet Shawl",
    category: "Women's Fashion",
    price: 95.0,
    rating: 4.8,
    badge: "Handmade",
    yarn: "Pima Cotton",
    image: dealAsset3,
  },
  {
    id: "fm-1",
    name: "Vintage Crochet Brown Unisex Overshirt",
    category: "Men's Fashion",
    price: 145.0,
    rating: 4.9,
    badge: "Men's Collection",
    yarn: "Pima Cotton",
    image: crochetShirtImg,
  },
  {
    id: "fm-2",
    name: "Exclusive Men's Heavy Knit Cardigan",
    category: "Men's Fashion",
    price: 175.0,
    rating: 4.9,
    badge: "Men's Wear",
    yarn: "Organic Wool",
    image: dealAsset2,
  },
  {
    id: "baby-1",
    name: "Sunflower Embroidered Baby Blanket & Set",
    category: "Baby Apparel",
    price: 65.0,
    rating: 5.0,
    badge: "Organic Cotton",
    yarn: "Pima Cotton",
    image: sunflowerImg,
  },
  {
    id: "baby-2",
    name: "Oatmeal Baby Cardigan",
    category: "Baby Apparel",
    price: 55.0,
    rating: 5.0,
    badge: "Best Seller",
    yarn: "Organic Wool",
    image: dealAsset1,
  },
  {
    id: "baby-3",
    name: "Heirloom Baby Booties & Bonnet",
    category: "Baby Apparel",
    price: 45.0,
    rating: 4.8,
    badge: "Hand-Knitted",
    yarn: "Merino Blend",
    image: dealAsset4,
  },
  {
    id: "fox-1",
    name: "Woodland Fox Amigurumi Toy",
    category: "Amigurumi",
    price: 45.0,
    rating: 4.8,
    badge: "Handmade",
    yarn: "Merino Blend",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCfltglqiOvS6H7gazjXaTVrBbCSZnCywjQlAAVV5E8HJ3dPvyseaSfcOA-c6J1k5l0AL9l_XWTFEo-cLNgxtAmEzElEoWVoNLDTuS9LE7mIAfDocUl_znl6-pLUm1iV9NMZxF38LgW2T2ugh8IKfmxwDZl0DtKlYBylQQNpyFxRSAlneEDo2oWjYQKMAI8iF31G8ENqv_voK3NiaFI74-QlMOAD4wByXLBL7CxpjgucU4ibL_9DFS9g",
  },
  {
    id: "tote-1",
    name: "Artisan Market Tote Bag",
    category: "Gifts & Home",
    price: 65.0,
    rating: 4.5,
    badge: "Sustainable",
    yarn: "Pima Cotton",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZjXoyFqITWtyeBf9_x06LRjGwIOKutGVmgUINwqIWgosdtZgNACUwfC6P6r9j9i870N3djxECshur5IYL0nGVLb7QgJ3KhPsqv8fdrvXJMUF5O25KeG_ynbplJhHeRYl8HilOs2uo7F7MiUEOsLOrs9r8b6B1YVS2_q5BmJ4gf0wg0prRhNm4dBJF6z7m4iXjusLPwu3FnVMmsjcJ8SGtOzxOMwhJ1OGhwMEJJeV3F3phWTNQeTEuGQ",
  },
];

const CollectionsScreen: React.FC = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYarn, setSelectedYarn] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  const categories = [
    "All",
    "Women's Fashion",
    "Men's Fashion",
    "Baby Apparel",
    "Adult Apparel",
    "Amigurumi",
    "Gifts & Home",
  ];

  const yarnTypes = ["All", "Organic Wool", "Pima Cotton", "Merino Blend"];

  // Sync Category from URL query parameter (e.g. ?category=Women's Fashion or ?category=Women)
  useEffect(() => {
    const catQuery = searchParams.get("category");
    if (catQuery) {
      if (catQuery.toLowerCase().includes("women")) {
        setSelectedCategory("Women's Fashion");
      } else if (catQuery.toLowerCase().includes("men")) {
        setSelectedCategory("Men's Fashion");
      } else if (catQuery.toLowerCase().includes("baby")) {
        setSelectedCategory("Baby Apparel");
      } else {
        const matchedCat = categories.find(
          (c) => c.toLowerCase() === catQuery.toLowerCase()
        );
        if (matchedCat) {
          setSelectedCategory(matchedCat);
        }
      }
    }
  }, [searchParams]);

  // Handler for category selection
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = allProducts
    .filter((prod) => {
      if (selectedCategory === "All") return true;
      if (selectedCategory === "Women's Fashion") {
        return prod.category === "Women's Fashion" || prod.category === "Adult Apparel";
      }
      if (selectedCategory === "Men's Fashion") {
        return prod.category === "Men's Fashion" || prod.category === "Adult Apparel";
      }
      return prod.category === selectedCategory;
    })
    .filter((prod) => selectedYarn === "All" || prod.yarn === selectedYarn)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 font-body text-[#1b1c1a]">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
          Our Craftsmanship
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          Curated Collections
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
                  onClick={() => setSelectedYarn(yarn)}
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
        <main className="lg:col-span-9 space-y-6">
          {/* Top Control Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-[#e4e2de] text-sm">
            <span className="text-[#76786f]">
              Showing <strong className="text-[#1b1c1a]">{filteredProducts.length}</strong> handcrafted pieces
              {selectedCategory !== "All" && (
                <span className="ml-2 font-semibold text-[#8e4d31]">
                  in {selectedCategory}
                </span>
              )}
            </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#e4e2de]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#efeeea]">
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
                      ${prod.price.toFixed(2)}
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
        </main>
      </div>
    </div>
  );
};

export default CollectionsScreen;
