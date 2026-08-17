import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { useCart } from "../context/CartContext";
import logoImg from "../assets/Logo.jpg";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCartOpen, totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search Bar state & suggestions
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const popularSuggestions = [
    { label: "Bag Charms", cat: "Gifts & Home" },
    { label: "Blanket Bouquets", cat: "Baby Apparel" },
    { label: "Book Lovers", cat: "Gifts & Home" },
    { label: "Bottle Holder", cat: "Gifts & Home" },
    { label: "Cardigan", cat: "Women's Fashion" },
    { label: "Overshirt", cat: "Men's Fashion" },
    { label: "Amigurumi", cat: "Amigurumi" },
  ];

  // Close search suggestion popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`${RouteName.COLLECTIONS}?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (query: string, category?: string) => {
    setSearchQuery(query);
    setIsSearchFocused(false);
    if (category) {
      navigate(`${RouteName.COLLECTIONS}?category=${encodeURIComponent(category)}&search=${encodeURIComponent(query)}`);
    } else {
      navigate(`${RouteName.COLLECTIONS}?search=${encodeURIComponent(query)}`);
    }
  };

  const navLinks = [
    { name: "Home", path: RouteName.HOME },
    { name: "COLLECTIONS", path: RouteName.COLLECTIONS },
    { name: "CATEGORIES", path: RouteName.COLLECTIONS, hasDropdown: true },
    { name: "LEARNING HUB", path: RouteName.LEARNING_HUB },
    { name: "CUSTOM INQUIRY", path: RouteName.CUSTOM_ORDER },
    { name: "MY ORDERS", path: RouteName.MY_ORDERS },
    { name: "CONTACT", path: RouteName.CONTACT },
  ];

  const categoriesList = [
    "All",
    "Women's Fashion",
    "Men's Fashion",
    "Baby Apparel",
    "Adult Apparel",
    "Amigurumi",
    "Gifts & Home",
  ];

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e4e2de] transition-all">
        {/* Original Layout Top Bar */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Logo with image */}
          <Link to={RouteName.HOME} className="flex items-center gap-3 shrink-0 group">
            <div className="bg-white p-1.5 rounded-xl border border-[#e4e2de] shadow-sm group-hover:border-[#8e4d31] transition-all">
              <img src={logoImg} alt="Crochet by Plaksha" className="h-12 sm:h-16 w-auto object-contain rounded-lg" />
            </div>

          </Link>

          {/* Center Search Bar with Popular Suggestions */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 sm:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#76786f] text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#f3f0e8] hover:bg-white focus:bg-white text-[#1b1c1a] placeholder-[#76786f] text-xs sm:text-sm pl-10 pr-10 py-2 rounded-md border border-[#c7c7bd] focus:border-[#8e4d31] outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-[#76786f] hover:text-[#1b1c1a]"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </form>

            {/* Popular Suggestions Popover */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e4e2de] rounded-xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f5f3ef]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8e4d31] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Popular Suggestions
                  </span>
                  <span className="text-[11px] text-[#76786f]">Click to search</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {popularSuggestions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSuggestionClick(item.label, item.cat)}
                      className="px-3 py-1.5 bg-[#f5f3ef] hover:bg-[#8e4d31] hover:text-white text-[#464840] rounded-lg text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] opacity-75">({item.cat})</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#f5f3ef] flex items-center justify-between text-xs text-[#76786f]">
                  <span>Press Enter to view results</span>
                  <Link
                    to={RouteName.COLLECTIONS}
                    onClick={() => setIsSearchFocused(false)}
                    className="text-[#8e4d31] font-bold hover:underline"
                  >
                    View Collections →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Actions: User Avatar Dropdown & Cart */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#464840] shrink-0 text-xs">
            {/* User Avatar with Initial & Dropdown Menu */}
            <div className="relative group">
              <Link
                to={RouteName.PROFILE}
                className="flex items-center gap-2 text-[#464840] hover:text-[#8e4d31] transition-colors py-1 px-1 rounded-full group"
              >
                {/* Circular Avatar with User Initial */}
                <div className="w-8 h-8 rounded-full bg-[#585e4c] text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:bg-[#8e4d31] transition-colors">
                  T
                </div>
                <span className="hidden sm:inline font-semibold text-xs text-[#1b1c1a] group-hover:text-[#8e4d31]">
                  Tayyaba Hamza
                </span>
                <span className="material-symbols-outlined text-sm text-[#76786f]">
                  expand_more
                </span>
              </Link>

              {/* Account Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#e4e2de] rounded-2xl shadow-xl p-2 z-50 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-[#f5f3ef] mb-1">
                  <p className="font-semibold text-xs text-[#1b1c1a]">Tayyaba Hamza</p>
                  <p className="text-[10px] text-[#76786f] truncate">tayyaba.hamza@example.com</p>
                </div>
                <Link
                  to={RouteName.PROFILE}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#464840] hover:bg-[#f5f3ef] hover:text-[#8e4d31] transition-colors"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  My Profile
                </Link>
                <Link
                  to={RouteName.MY_ORDERS}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#464840] hover:bg-[#f5f3ef] hover:text-[#8e4d31] transition-colors"
                >
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  My Orders
                </Link>
                <div className="border-t border-[#f5f3ef] my-1" />
                <Link
                  to={RouteName.AUTH}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  Logout
                </Link>
              </div>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex flex-col items-center hover:text-[#8e4d31]"
              aria-label="Open Cart"
            >
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              <span className="text-[10px]">Cart</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#8e4d31] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#1b1c1a] hover:bg-[#eae8e4] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Original Horizontal Menu Links Bar */}
        <div className="hidden lg:block border-t border-[#efeeea] bg-[#fbf9f5]">
          <nav className="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex items-center justify-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-1"
                    onMouseEnter={() => setCategoryDropdownOpen(true)}
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className={`text-[11px] font-semibold tracking-wider transition-all flex items-center gap-1 ${isActive ? "text-[#8e4d31]" : "text-[#464840] hover:text-[#8e4d31]"
                        }`}
                    >
                      <span>{link.name}</span>
                      <span className="material-symbols-outlined text-xs">keyboard_arrow_down</span>
                    </button>

                    {/* Dropdown Menu Box */}
                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 w-60 bg-white border border-[#e4e2de] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8e4d31] mb-2 px-3 pt-1">
                          CATEGORY
                        </div>
                        <div className="space-y-1">
                          {categoriesList.map((cat, idx) => (
                            <button
                              key={cat}
                              onClick={() => {
                                setCategoryDropdownOpen(false);
                                if (cat === "All") {
                                  navigate(RouteName.COLLECTIONS);
                                } else {
                                  navigate(`${RouteName.COLLECTIONS}?category=${encodeURIComponent(cat)}`);
                                }
                              }}
                              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${idx === 0
                                ? "bg-[#8e4d31] text-white shadow-sm"
                                : "text-[#464840] hover:bg-[#f5f3ef] hover:text-[#8e4d31]"
                                }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-semibold tracking-wider transition-all py-1 flex items-center gap-1 ${isActive
                    ? "text-[#8e4d31] border-b-2 border-[#8e4d31]"
                    : "text-[#464840] hover:text-[#8e4d31]"
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fbf9f5] border-b border-[#e4e2de] px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-bold tracking-wider py-2 border-b border-[#efeeea] ${location.pathname === link.path ? "text-[#8e4d31]" : "text-[#464840]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

      </header>
      {/* Sticky Floating WhatsApp Button on Bottom Right */}
      <a
        href="https://wa.me/923173004661?text=Hello%20CrochCosmo!%20I%20want%20to%20inquire%20about%20a%20product."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20ba5a] transition-all flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </>
  );
};

export default Navbar;

