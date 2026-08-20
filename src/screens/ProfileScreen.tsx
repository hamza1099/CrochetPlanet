import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RouteName } from "../routes/RouteName";

const ProfileScreen: React.FC = () => {
  const { user, isLoggedIn, openAuthModal, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const phone = user?.phone || "";
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");

  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 font-body text-[#1b1c1a] text-center space-y-6">
        <div className="w-20 h-20 bg-[#f5f3ef] rounded-full flex items-center justify-center mx-auto text-[#8e4d31]">
          <span className="material-symbols-outlined text-4xl">lock</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold">
          Account Login Required
        </h1>
        <p className="text-sm text-[#76786f] max-w-md mx-auto">
          Please log in with your phone number to access your CrochCosmo profile, track orders, and manage your delivery details.
        </p>
        <button
          onClick={openAuthModal}
          className="px-8 py-3.5 bg-[#8e4d31] hover:bg-[#71361d] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
        >
          Login / Register with OTP →
        </button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, address, city });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-[#e4e2de] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#585e4c] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e4d31] block">
                Boutique Customer
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1b1c1a]">
                {user.name}
              </h1>
              <p className="text-xs text-[#76786f]">{user.phone} • {user.email || "No email added"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to={RouteName.MY_ORDERS}
              className="px-4 py-2.5 bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              <span>My Orders</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate(RouteName.HOME);
              }}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#e4e2de] shadow-sm space-y-6">
          <div className="pb-4 border-b border-[#f5f3ef]">
            <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
              Personal Information & Shipping Address
            </h3>
            <p className="text-xs text-[#76786f]">
              Update your details for faster checkout and delivery updates.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Your profile information has been saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Mobile Number
                </label>
                <input
                  required
                  disabled
                  type="tel"
                  value={phone}
                  className="w-full bg-[#f5f3ef] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm text-[#76786f] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#585e4c] mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="House / Apartment #, Street, Area..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#8e4d31] hover:bg-[#71361d] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
