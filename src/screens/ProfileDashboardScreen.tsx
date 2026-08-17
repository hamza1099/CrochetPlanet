import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import sageSweaterImg from "../assets/66e6aeeec3152c92d24b10fe5084a16d.jpg";
import throwBlanketImg from "../assets/1e395a4512140c8e752d25cdaaff7bd6.jpg";

export const ProfileDashboardScreen: React.FC = () => {
  const [emailNewsletter, setEmailNewsletter] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Personal Info state
  const [userInfo, setUserInfo] = useState({
    fullName: "Tayyaba Hamza",
    email: "tayyaba.hamza@example.com",
    phone: "+92 317 3004661",
    street: "123 Artisan Way, Apt 4B",
    cityStateZip: "Karachi, PK 75500",
    country: "Pakistan",
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(userInfo);

  const handleEditClick = () => {
    setFormData(userInfo);
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo(formData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] relative">
      {/* Header Banner */}
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-[#1b1c1a] mb-2">
          Welcome Back, {userInfo.fullName}
        </h1>
        <p className="text-sm md:text-base text-[#76786f]">
          Manage your personal information and track your artisan pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Personal Information & Preferences */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Personal Information Card */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#585e4c]" />
            
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-display text-xl font-semibold text-[#1b1c1a]">
                Personal Information
              </h2>
              <button
                onClick={handleEditClick}
                className="text-[11px] font-bold tracking-widest text-[#8e4d31] border-b border-[#8e4d31] hover:opacity-80 transition-opacity uppercase"
              >
                EDIT
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-1 uppercase">
                  Full Name
                </span>
                <span className="font-medium text-[#1b1c1a]">{userInfo.fullName}</span>
              </div>

              <div>
                <span className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-1 uppercase">
                  Email Address
                </span>
                <span className="font-medium text-[#1b1c1a]">{userInfo.email}</span>
              </div>

              <div>
                <span className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-1 uppercase">
                  Phone Number
                </span>
                <span className="font-medium text-[#1b1c1a]">{userInfo.phone}</span>
              </div>

              <div>
                <span className="block text-[11px] font-bold tracking-widest text-[#76786f] mb-1 uppercase">
                  Shipping Address
                </span>
                <p className="font-medium text-[#1b1c1a] leading-relaxed">
                  {userInfo.street}<br />
                  {userInfo.cityStateZip}<br />
                  {userInfo.country}
                </p>
              </div>
            </div>
          </section>

          {/* Account Preferences */}
          <section className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8 border border-[#e4e2de]">
            <h3 className="font-display text-lg font-semibold text-[#1b1c1a] mb-5">
              Account Preferences
            </h3>

            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-medium text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors">
                  Email Newsletter
                </span>
                <input
                  type="checkbox"
                  checked={emailNewsletter}
                  onChange={(e) => setEmailNewsletter(e.target.checked)}
                  className="w-5 h-5 accent-[#585e4c] rounded cursor-pointer"
                />
              </label>

              <div className="h-px w-full bg-[#e4e2de]" />

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-medium text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors">
                  SMS Notifications
                </span>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="w-5 h-5 accent-[#585e4c] rounded cursor-pointer"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Purchase History */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-[#e4e2de] pb-4">
            <h2 className="font-display text-2xl font-semibold text-[#1b1c1a]">
              Purchase History
            </h2>
            <Link
              to={RouteName.MY_ORDERS}
              className="text-[11px] font-bold tracking-widest text-[#8e4d31] border-b border-[#8e4d31] hover:opacity-80 transition-opacity uppercase"
            >
              VIEW ALL
            </Link>
          </div>

          {/* Order Card 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-[#c7c7bd] transition-all group">
            <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-[#f5f3ef]">
              <img
                src={sageSweaterImg}
                alt="Chunky Sage Green Sweater"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-grow w-full">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#f5f3ef] text-[#76786f] rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                    Processing
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                    Order #1257
                  </h3>
                  <p className="text-xs text-[#76786f] mt-1">Placed on October 24, 2026</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-[#1b1c1a]">
                    $245.00
                  </span>
                  <p className="text-xs text-[#76786f] mt-1">1 Item</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#f5f3ef] flex justify-between items-center text-xs">
                <span className="text-[#8e4d31] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  Expected Delivery: Oct 30
                </span>
                <Link
                  to={RouteName.MY_ORDERS}
                  className="bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  TRACK
                </Link>
              </div>
            </div>
          </div>

          {/* Order Card 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-[#c7c7bd] transition-all group">
            <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-[#f5f3ef]">
              <img
                src={throwBlanketImg}
                alt="Hand-woven throw blanket"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-grow w-full">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#585e4c]/10 text-[#585e4c] rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                    Delivered
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                    Order #1254
                  </h3>
                  <p className="text-xs text-[#76786f] mt-1">Placed on September 12, 2026</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-[#1b1c1a]">
                    $180.00
                  </span>
                  <p className="text-xs text-[#76786f] mt-1">2 Items</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#f5f3ef] flex justify-between items-center text-xs">
                <span className="text-[#76786f] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#585e4c]">
                    check_circle
                  </span>
                  Delivered on Sep 18
                </span>
                <div className="flex gap-3">
                  <button className="text-[#1b1c1a] hover:text-[#8e4d31] text-[10px] font-bold tracking-widest uppercase transition-all">
                    INVOICE
                  </button>
                  <button className="bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors">
                    BUY AGAIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Personal Information Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-[#e4e2de] relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#f5f3ef] mb-6">
              <h3 className="font-display text-2xl font-semibold text-[#1b1c1a]">
                Edit Personal Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#76786f] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                    City, State & Zip
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityStateZip}
                    onChange={(e) => setFormData({ ...formData, cityStateZip: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#76786f] uppercase mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c7c7bd] focus:border-[#585e4c] rounded-xl px-4 py-3 text-[#1b1c1a] outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#f5f3ef] mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboardScreen;
