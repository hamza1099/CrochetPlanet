import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artisanHandsImg from "../assets/side banner.jpg";
import { fetchOrdersApi } from "../service/networkService";
import { useAuth } from "../context/AuthContext";
import { RouteName } from "../routes/RouteName";

export const MyOrdersScreen: React.FC = () => {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrdersApi({ email: user?.email, phone: user?.phone })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setOrdersList(data);
          if (data.length > 0) {
            setExpandedOrder(data[0].id);
          }
        }
      })
      .catch((err) => console.warn("Failed fetching live orders:", err))
      .finally(() => setIsLoading(false));
  }, [user]);

  const toggleTracking = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  // Helper to normalize phone numbers for accurate matching
  const cleanDigits = (str?: string) => (str ? str.replace(/\D/g, "") : "");

  // Filter orders for the logged-in user
  const userOrders = isLoggedIn && user
    ? ordersList.filter((ord) => {
        const uPhoneDigits = cleanDigits(user.phone);
        const ordPhoneDigits = cleanDigits(ord.phone);

        const phoneMatch = uPhoneDigits.length > 5 && ordPhoneDigits.includes(uPhoneDigits.slice(-7));
        const emailMatch = user.email && ord.email && user.email.toLowerCase() === ord.email.toLowerCase();
        const nameMatch = user.name && ord.customerName && ord.customerName.toLowerCase().includes(user.name.toLowerCase());

        return phoneMatch || emailMatch || nameMatch;
      })
    : [];

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 font-body text-[#1b1c1a] min-h-screen text-center flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 bg-[#f5f3ef] rounded-full flex items-center justify-center text-[#8e4d31]">
          <span className="material-symbols-outlined text-4xl">local_shipping</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold">
          Track Your Orders
        </h1>
        <p className="text-sm text-[#76786f] max-w-md leading-relaxed">
          Please log in with your phone number to view your order history, live artisan tracking, and delivery updates.
        </p>
        <button
          onClick={openAuthModal}
          className="px-8 py-3.5 bg-[#8e4d31] hover:bg-[#71361d] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
        >
          Login / Sign Up with Phone OTP →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] min-h-screen">
      {/* Page Header */}
      <div className="mb-12 text-center md:text-left max-w-2xl">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e4d31] block mb-1">
          Account: {user.name} ({user.phone})
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1b1c1a] mb-3">
          Your Order Journey
        </h1>
        <p className="text-sm md:text-base text-[#76786f] leading-relaxed">
          Track the progress of your handcrafted pieces. Each stitch takes time, and we appreciate your patience as our artisans create your unique garments.
        </p>
      </div>

      {/* Orders Grid */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2de]">
            <span className="material-symbols-outlined text-4xl text-[#8e4d31] animate-spin mb-2">sync</span>
            <p className="text-sm font-bold text-[#464840]">Fetching your orders...</p>
          </div>
        ) : userOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2de] space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#c7c7bd]">shopping_bag</span>
            <div>
              <p className="text-sm font-bold text-[#464840]">No orders found for {user.phone}</p>
              <p className="text-xs text-[#76786f] mt-1">When you place an order, it will appear here with live artisan updates.</p>
            </div>
            <Link
              to={RouteName.COLLECTIONS}
              className="inline-block px-6 py-2.5 bg-[#8e4d31] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          userOrders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 overflow-hidden">
              {/* Order Header (Clickable) */}
              <div
                onClick={() => toggleTracking(ord.id)}
                className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#f5f3ef]/50 transition-colors group"
              >
                <div className="flex flex-col mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-2xl font-semibold text-[#1b1c1a]">
                      Order #{ord.id}
                    </span>
                    <span className="px-3 py-1 bg-[#585e4c]/10 text-[#585e4c] text-[10px] font-bold tracking-widest rounded-xl uppercase">
                      {ord.status || "Processing"}
                    </span>
                  </div>
                  <span className="text-xs text-[#76786f]">
                    Customer: {ord.customerName} • Phone: {ord.phone} • Date: {ord.date || "Recently"} • {ord.itemsCount || 1} items
                  </span>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <span className="font-display text-2xl font-bold text-[#1b1c1a]">
                    Rs. {Number(ord.totalPKR || (ord.totalUSD ? ord.totalUSD * 280 : 0)).toLocaleString()}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#76786f] group-hover:text-[#585e4c] transition-transform duration-300 ${
                      expandedOrder === ord.id ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {/* Tracking Details Expansion */}
              {expandedOrder === ord.id && (
                <div className="bg-[#fbf9f5] border-t border-[#e4e2de]/60 p-6 md:p-12 animate-in fade-in duration-300">
                  {/* Progress Stepper Bar */}
                  <div className="relative w-full max-w-4xl mx-auto mb-14 mt-4">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 px-4 md:px-8">
                      <div className="h-0.5 w-full bg-[#e4e2de] relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-2/3 bg-[#585e4c] transition-all duration-500" />
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-[#585e4c] text-white flex items-center justify-center mb-3 shadow-sm">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hidden md:block">
                          Received
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-[#585e4c] text-white flex items-center justify-center mb-3 shadow-sm">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#585e4c] hidden md:block">
                          Confirmed
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-white flex items-center justify-center mb-3 shadow-[0_0_0_4px_rgba(88,94,76,0.15)]">
                          <div className="w-3 h-3 bg-[#585e4c] rounded-full" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a] hidden md:block">
                          {ord.status || "In Progress"}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#c7c7bd] bg-white flex items-center justify-center mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#76786f] hidden md:block">
                          Shipped
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Artisan Update Card */}
                  <div className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start border border-[#e4e2de]">
                    <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                      <img
                        src={artisanHandsImg}
                        alt="Artisan hands crocheting"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                        Artisan Update: Crafting your Order
                      </h3>
                      <p className="text-xs sm:text-sm text-[#76786f] leading-relaxed">
                        Payment Method: <strong>{ord.paymentMethod || "COD"}</strong>. Our master artisan Zainab is carefully assembling your items using 100% natural organic yarn.
                      </p>
                      <button className="text-[11px] font-bold tracking-widest text-[#585e4c] border-b border-[#585e4c] hover:text-[#8e4d31] hover:border-[#8e4d31] transition-colors uppercase pt-2">
                        AUTHENTICATED CROCHCOSMO PIECE
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersScreen;
