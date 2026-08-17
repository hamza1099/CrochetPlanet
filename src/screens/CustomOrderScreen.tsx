import React, { useState } from "react";

const CustomOrderScreen: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a]">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-[#e4e2de] shadow-xl space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
            Bespons & Custom Crafts
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1b1c1a]">
            Custom Order Inquiry
          </h1>
          <p className="text-sm text-[#464840]">
            Have a specific design, colorway, size, or custom heirloom blanket in mind? Our master artisans will bring your vision to life.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4 bg-[#f5f3ef] rounded-2xl p-8">
            <span className="material-symbols-outlined text-5xl text-[#585e4c]">
              check_circle
            </span>
            <h3 className="font-display text-2xl font-semibold text-[#1b1c1a]">
              Inquiry Received!
            </h3>
            <p className="text-sm text-[#464840]">
              Thank you for reaching out. Our design team and master artisan will review your custom specifications and respond within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-[#8e4d31] text-white rounded-lg text-xs font-bold uppercase tracking-widest"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="eleanor@example.com"
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                Item Type & Category
              </label>
              <select className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]">
                <option>Custom Heirloom Baby Blanket</option>
                <option>Custom Adult Cardigan / Sweater</option>
                <option>Custom Amigurumi / Plush Toy Set</option>
                <option>Bespoke Home Decor / Throw</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                Color Palette & Specifications
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your desired measurements, yarn colors, embroidery initials, or upload notes..."
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Submit Custom Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomOrderScreen;
