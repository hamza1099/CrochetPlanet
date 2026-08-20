import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e4e2de] shadow-sm flex flex-col h-full animate-shimmer">
      {/* Aspect Ratio Image Skeleton with soft pulse */}
      <div className="aspect-[4/5] bg-gradient-to-r from-[#eae8e4] via-[#f5f3ef] to-[#eae8e4] w-full relative overflow-hidden" />
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Badge & Rating skeleton */}
          <div className="flex justify-between items-center">
            <div className="w-24 h-4 bg-[#eae8e4] rounded-full" />
            <div className="w-12 h-4 bg-[#eae8e4] rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-1.5">
            <div className="w-full h-4 bg-[#eae8e4] rounded-md" />
            <div className="w-3/4 h-4 bg-[#eae8e4] rounded-md" />
          </div>

          {/* Subtitle / Yarn skeleton */}
          <div className="w-1/2 h-3 bg-[#eae8e4] rounded-md" />
        </div>

        {/* Price & Action skeleton */}
        <div className="pt-4 border-t border-[#f5f3ef] flex items-center justify-between">
          <div className="w-20 h-7 bg-[#eae8e4] rounded-lg" />
          <div className="w-28 h-9 bg-[#eae8e4] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] md:aspect-video lg:max-h-[85vh] bg-gradient-to-r from-[#eae8e4] via-[#f5f3ef] to-[#eae8e4] animate-shimmer shadow-lg flex items-end p-8">
      <div className="space-y-3 w-full max-w-md">
        <div className="w-32 h-6 bg-white/60 rounded-full" />
        <div className="w-3/4 h-8 bg-white/60 rounded-xl" />
        <div className="w-1/2 h-4 bg-white/60 rounded-lg" />
      </div>
    </div>
  );
};

export const CategoryGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e4e2de] animate-shimmer shadow-sm">
          <div className="aspect-[4/5] bg-gradient-to-r from-[#eae8e4] via-[#f5f3ef] to-[#eae8e4]" />
          <div className="p-4 bg-[#fbf9f5] flex justify-center">
            <div className="w-28 h-5 bg-[#eae8e4] rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
