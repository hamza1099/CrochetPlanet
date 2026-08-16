import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#efeeea] border-t border-[#e4e2de] text-[#1b1c1a] font-body mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8e4d31] text-white flex items-center justify-center font-display font-bold text-sm">
              YC
            </div>
            <span className="font-display text-2xl font-semibold text-[#8e4d31]">
              Yarn & Crochet
            </span>
          </div>
          <p className="text-sm text-[#464840] leading-relaxed">
            Authentic, slow-crafted luxury crochet pieces handmade by skilled women artisans. Preserving heritage craft and empowering communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold text-[#8e4d31] mb-4">
            Collections
          </h4>
          <ul className="space-y-2.5 text-sm text-[#464840]">
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-[#8e4d31] transition-colors">
                Baby & Heirloom Apparel
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-[#8e4d31] transition-colors">
                Adult Slow Knit & Wear
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-[#8e4d31] transition-colors">
                Amigurumi & Plush Toys
              </Link>
            </li>
            <li>
              <Link to={RouteName.COLLECTIONS} className="hover:text-[#8e4d31] transition-colors">
                Luxury Home & Throws
              </Link>
            </li>
          </ul>
        </div>

        {/* Story & Learning */}
        <div>
          <h4 className="font-display text-lg font-semibold text-[#8e4d31] mb-4">
            About & Craft
          </h4>
          <ul className="space-y-2.5 text-sm text-[#464840]">
            <li>
              <Link to={RouteName.ARTISANS} className="hover:text-[#8e4d31] transition-colors">
                Meet Our Local Artisans
              </Link>
            </li>
            <li>
              <Link to={RouteName.ORGANIC_LUXURY} className="hover:text-[#8e4d31] transition-colors">
                Organic Wool & Care Guide
              </Link>
            </li>
            <li>
              <Link to={RouteName.LEARNING_HUB} className="hover:text-[#8e4d31] transition-colors">
                Masterclass & Learning Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="font-display text-lg font-semibold text-[#8e4d31]">
            Join Our Circle
          </h4>
          <p className="text-sm text-[#464840]">
            Subscribe to receive story updates from artisans, new collection launches, and masterclass invitations.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2.5 bg-white border border-[#c7c7bd] rounded-lg text-sm flex-grow focus:outline-none focus:border-[#8e4d31]"
            />
            <button className="px-5 py-2.5 bg-[#8e4d31] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#71361d] transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e4e2de] py-6 px-6 text-center text-xs text-[#76786f]">
        © 2026 Yarn & Crochet Luxury Boutique. All Rights Reserved. Crafted with Intention & Heart.
      </div>
    </footer>
  );
};

export default Footer;
