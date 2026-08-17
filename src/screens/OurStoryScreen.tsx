import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const OurStoryScreen: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a] space-y-20">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block">
            The Heritage & Soul
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a] leading-tight">
            Crafting slow luxury with intention and soul.
          </h1>
          <p className="text-lg text-[#464840] leading-relaxed">
            We believe in the quiet power of handmade textiles. Every stitch is a testament to the artisan's dedication, weaving narratives of tradition, empowerment, and organic beauty into wearable art.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETdy2a0dAi5SzOar-8VTWG2_8jfXpatDcNjfgN7lq3y2-x5xjGtpCZ8Xiknsf3-xrZraps7x11ftE-klo67tOVN-bxHimfr9GALLFm-rf1XRs8mx3XiT7MtNPS0HfhafqTNBTmX_2omv_-gvBEF3Yd6Xfi2yBGeWksS3hgfstFjNZPyVY9Cq9rGCvdWd3dDwk4vSqIZPhDHp4XdxOS6t_0SHbO5iQjA9c8R1GezVrd6oQbCTvspL0tg"
            alt="Artisan Hands Crocheting"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#f5f3ef] rounded-3xl p-10 md:p-16 border border-[#e4e2de]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnxEX8l_kbLxIdbKqiUoNDL6Xx47pd10soJHrETiIfsuCA7oMwKSu9fHA_W4ZwrlpveZgraRcpVeLtql0N1UBOdVZQO8KJPxZLq8YYYoN0sMr0MABdSgKCRdRq7gtO_-5rKEA0iPpYgjm2B6R91Iq8FfgJ6qxnTHneo34fz0uSplCTUwsMhrHY8IlpeIysOC6PRCU16Sw2w_42sBpMS-8FmLTzGgEuDlxjRoxMN7wsOknpIBfgAPex1g"
              alt="Artisan Woman in Studio"
              className="rounded-2xl object-cover h-[400px] w-full shadow-lg"
            />
          </div>
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1b1c1a]">
              Our Double Mission
            </h2>
            <p className="text-base text-[#464840] leading-relaxed">
              Yarn & Crochet was born from a desire to return to mindful consumption. In a world of fleeting trends, we anchor ourselves in the enduring elegance of artisanal craft.
            </p>
            <p className="text-base text-[#464840] leading-relaxed">
              Our mission is twofold: to provide discerning individuals with exquisite, sustainable garments, and to economically empower the skilled women who bring these designs to life.
            </p>
            <div className="pt-4">
              <Link
                to={RouteName.ARTISANS}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8e4d31] hover:underline"
              >
                Meet the artisans who craft our pieces →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryScreen;
