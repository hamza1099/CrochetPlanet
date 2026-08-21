import React, { useState, useEffect } from "react";
import { createInquiryApi, fetchPopularCategoriesApi } from "../service/networkService";
import { Loader2 } from "lucide-react";

const CustomOrderScreen: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [itemType, setItemType] = useState("");
  const [specs, setSpecs] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchPopularCategoriesApi()
      .then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          const sortedCats = cats
            .filter((c: any) => c.active !== false)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((c: any) => c.categoryName || c.title)
            .filter(Boolean);
            
          const uniqueAdminCats = Array.from(new Set(sortedCats)) as string[];
          setCategorySuggestions(uniqueAdminCats);
        }
      })
      .catch((err) => console.warn("Error fetching categories for CustomOrderScreen:", err));
      
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      email,
      phone,
      itemType,
      specs,
      status: "New",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      setIsSubmitting(true);
      await createInquiryApi(newInquiry);
      setSubmitted(true);
    } catch (err) {
      console.error("Submitting inquiry error:", err);
      alert("Failed to submit your inquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Contact Info (Connect With Us) */}
        <div className="md:col-span-5 space-y-8 bg-[#f5f3ef] p-8 md:p-12 rounded-3xl border border-[#e4e2de]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31] block mb-2">
              Connect With Us
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1b1c1a]">
              We'd Love To Hear From You
            </h1>
            <p className="text-sm text-[#464840] mt-3 leading-relaxed">
              Whether you have questions about order customization, sizing, artisan stories, or wholesale inquiries, our boutique team is here to assist.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-[#e4e2de] text-sm">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[#8e4d31]">
                location_on
              </span>
              <div>
                <strong className="block text-[#1b1c1a]">Artisan Atelier Studio</strong>
                <span className="text-[#464840]">Lala Rukh Colony Lane 1, Rawalpindi, Pakistan</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[#585e4c]">
                mail
              </span>
              <div>
                <strong className="block text-[#1b1c1a]">Email Inquiry</strong>
                <span className="text-[#464840]">arifhamza813@gmail.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[#877152]">
                phone
              </span>
              <div>
                <strong className="block text-[#1b1c1a]">Customer Care</strong>
                <span className="text-[#464840]">03173004661</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Order Inquiry Form */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-[#e4e2de] shadow-xl space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8e4d31]">
            Bespoke & Custom Crafts
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
              onClick={() => {
                setSubmitted(false);
                setSpecs("");
              }}
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
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Item Type & Category
                </label>
                <input
                  type="text"
                  list="category-suggestions"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  placeholder="Type or select a category..."
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <datalist id="category-suggestions">
                  {categorySuggestions.map((cat, idx) => (
                    <option key={idx} value={cat} />
                  ))}
                  {/* Fallback suggestions if categories haven't loaded or are empty */}
                  {categorySuggestions.length === 0 && (
                    <>
                      <option value="Custom Heirloom Baby Blanket" />
                      <option value="Custom Adult Cardigan / Sweater" />
                      <option value="Custom Amigurumi / Plush Toy Set" />
                      <option value="Bespoke Home Decor / Throw" />
                    </>
                  )}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                Color Palette & Specifications
              </label>
              <textarea
                required
                rows={4}
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="Describe your desired measurements, yarn colors, embroidery initials, or upload notes..."
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Custom Inquiry"
              )}
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default CustomOrderScreen;

