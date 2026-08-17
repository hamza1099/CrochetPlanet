import React, { useState } from "react";

const ContactScreen: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
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
                <span className="text-[#464840]">Boutique Studio & Workshop, Lahore / Islamabad</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[#585e4c]">
                mail
              </span>
              <div>
                <strong className="block text-[#1b1c1a]">Email Inquiry</strong>
                <span className="text-[#464840]">concierge@yarncrochet.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-2xl text-[#877152]">
                phone
              </span>
              <div>
                <strong className="block text-[#1b1c1a]">Customer Care</strong>
                <span className="text-[#464840]">+92 (042) 111-YARN-CR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-[#e4e2de] shadow-lg">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="material-symbols-outlined text-5xl text-[#585e4c]">
                mark_email_read
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#1b1c1a]">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-[#464840]">
                Thank you for contacting Yarn & Crochet. Our boutique concierge will respond to your email promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#8e4d31] text-white rounded-lg text-xs font-bold uppercase tracking-widest"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl font-semibold text-[#1b1c1a]">
                Send Us A Direct Message
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry, Sizing, or Wholesale"
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
