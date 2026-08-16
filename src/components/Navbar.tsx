import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { setIsCartOpen, totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: RouteName.HOME },
    { name: "Collections", path: RouteName.COLLECTIONS },
    { name: "Artisans", path: RouteName.ARTISANS },
    { name: "Organic Luxury", path: RouteName.ORGANIC_LUXURY },
    { name: "Learning Hub", path: RouteName.LEARNING_HUB },
    { name: "Contact", path: RouteName.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e4e2de] transition-all">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to={RouteName.HOME} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#8e4d31]/10 border border-[#8e4d31]/30 flex items-center justify-center text-[#8e4d31] font-display font-bold text-lg group-hover:bg-[#8e4d31] group-hover:text-white transition-all">
            Y&C
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight text-[#8e4d31]">
            Yarn & Crochet
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all py-1 ${
                  isActive
                    ? "text-[#8e4d31] border-b-2 border-[#8e4d31]"
                    : "text-[#464840] hover:text-[#8e4d31]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={RouteName.CUSTOM_ORDER}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#585e4c] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#717763] transition-all shadow-sm"
          >
            Custom Order
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 hover:bg-[#eae8e4] rounded-full transition-colors text-[#585e4c]"
            aria-label="Open Cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {totalCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8e4d31] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1b1c1a] hover:bg-[#eae8e4] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f5] border-b border-[#e4e2de] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium py-2 border-b border-[#efeeea] ${
                location.pathname === link.path ? "text-[#8e4d31] font-bold" : "text-[#464840]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to={RouteName.CUSTOM_ORDER}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 bg-[#585e4c] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Inquire Custom Order
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
