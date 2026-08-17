import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import logoImg from "../assets/Logo.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#585e4c] border-t border-[#464840] text-[#fbf9f5] font-body mt-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
        {/* Brand info with prominent logo */}
        <div className="space-y-4 md:col-span-1">
          <Link to={RouteName.HOME} className="flex items-center gap-3.5 group">
            <img
              src={logoImg}
              alt="CrochCosmo Logo"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-contain p-1 border-2 border-[#F5F1E5] shadow-lg bg-[#F5F1E5] group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
            />
            <div>
              <span className="font-display text-2xl md:text-3xl font-semibold text-[#F5F1E5] block tracking-tight leading-tight">
                CrochCosmo
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e2d5c3]">
                Luxury Artisanal Knitwear
              </span>
            </div>
          </Link>
          <p className="text-xs md:text-sm text-[#e2d5c3] leading-relaxed">
            Authentic, slow-crafted luxury crochet pieces handmade by skilled women artisans. Preserving heritage craft and empowering communities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 pt-3">
          <h4 className="font-display text-xl font-semibold text-[#F5F1E5] tracking-wide">
            Collections
          </h4>
          <ul className="space-y-2.5 text-xs md:text-sm text-[#e2d5c3]">
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-white transition-colors">
                Baby & Heirloom Apparel
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-white transition-colors">
                Adult Slow Knit & Wear
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-white transition-colors">
                Amigurumi & Plush Toys
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-white transition-colors">
                Luxury Home & Throws
              </Link>
            </li>
          </ul>
        </div>

        {/* Story & Learning */}
        <div className="space-y-4 pt-3">
          <h4 className="font-display text-xl font-semibold text-[#F5F1E5] tracking-wide">
            About & Craft
          </h4>
          <ul className="space-y-2.5 text-xs md:text-sm text-[#e2d5c3]">
            <li>
              <Link to={RouteName.ARTISANS} className="hover:text-white transition-colors">
                Meet Our Local Artisans
              </Link>
            </li>
            <li>
              <Link to={RouteName.ORGANIC_LUXURY} className="hover:text-white transition-colors">
                Organic Wool & Care Guide
              </Link>
            </li>
            <li>
              <Link to={RouteName.LEARNING_HUB} className="hover:text-white transition-colors">
                Masterclass & Learning Hub
              </Link>
            </li>
            <li>
              <Link to={RouteName.CUSTOM_ORDER} className="hover:text-white transition-colors">
                Bespoke & Custom Order Inquiry
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4 pt-3">
          <h4 className="font-display text-xl font-semibold text-[#F5F1E5] tracking-wide">
            Join Our Circle
          </h4>
          <p className="text-xs md:text-sm text-[#e2d5c3] leading-relaxed">
            Subscribe to receive story updates from artisans, new collection launches, and masterclass invitations.
          </p>
          <div className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 bg-[#F5F1E5] border border-[#e2d5c3] text-[#1b1c1a] rounded-xl text-xs flex-grow focus:outline-none focus:border-[#8e4d31] placeholder-[#76786f]"
            />
            <button className="px-6 py-3 bg-[#8E4D31] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#71361d] transition-colors shadow-md shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#717763] py-6 px-6 text-center text-xs text-[#e2d5c3]">
        © 2026 CrochCosmo Luxury Boutique. All Rights Reserved. Crafted with Intention & Heart.
      </div>
    </footer>
  );
};

export default Footer;
