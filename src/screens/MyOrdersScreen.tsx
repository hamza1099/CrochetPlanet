import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artisanHandsImg from "../assets/side banner.jpg";
import { fetchOrdersApi } from "../service/networkService";
import { RouteName } from "../routes/RouteName";

export const MyOrdersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch live orders from backend/firestore
    fetchOrdersApi()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setOrdersList(data);
        }
      })
      .catch((err) => console.warn("Failed fetching live orders:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleTracking = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  const cleanDigits = (str?: string) => (str ? str.replace(/\D/g, "") : "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setActiveQuery(q);
    if (q) {
      // Auto expand matching order when searched
      const match = ordersList.find((ord) => 
        (ord.id && ord.id.toLowerCase().includes(q.toLowerCase())) ||
        (ord.phone && cleanDigits(ord.phone).includes(cleanDigits(q)))
      );
      if (match) {
        setExpandedOrder(match.id);
      }
    }
  };

  // Only filter orders if user has actively searched
  const matchedOrders = activeQuery.trim().length === 0 ? [] : ordersList.filter((ord) => {
    const q = activeQuery.toLowerCase().trim();
    const idMatch = ord.id && ord.id.toLowerCase().includes(q);
    const phoneMatch = ord.phone && cleanDigits(ord.phone).includes(cleanDigits(q));
    const emailMatch = ord.email && ord.email.toLowerCase().includes(q);
    const nameMatch = ord.customerName && ord.customerName.toLowerCase().includes(q);
    return idMatch || phoneMatch || emailMatch || nameMatch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a] min-h-screen">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e4d31] block">
          CrochCosmo Direct Order Tracking
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1b1c1a]">
          Track Your Order
        </h1>
        <p className="text-sm text-[#76786f] leading-relaxed">
          Enter your <strong>Tracking ID</strong> (e.g. <code>ORD-XXXX</code>) or phone number below to check your live order progress, payment verification, and artisan updates.
        </p>

        {/* Tracking ID Search Form */}
        <form onSubmit={handleSearchSubmit} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#76786f]">
              search
            </span>
            <input
              type="text"
              placeholder="Enter Order ID or Phone (e.g. ORD-XXXX)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#c7c7bd] rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#8e4d31] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#8e4d31] hover:bg-[#71361d] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex-shrink-0"
          >
            Track Order
          </button>
        </form>
      </div>

      {/* Orders Output */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2de]">
            <span className="material-symbols-outlined text-4xl text-[#8e4d31] animate-spin mb-2">sync</span>
            <p className="text-sm font-bold text-[#464840]">Connecting to live orders...</p>
          </div>
        ) : activeQuery.trim().length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2de] p-8 space-y-4 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-[#c7c7bd]">search</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                Enter your Tracking ID to view live order progress
              </h3>
              <p className="text-xs text-[#76786f] mt-1 max-w-md mx-auto leading-relaxed">
                Please enter your Order ID (e.g. <strong>ORD-XXXX</strong>) or phone number above and click <strong>Track Order</strong>.
              </p>
            </div>
          </div>
        ) : matchedOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e4e2de] p-8 space-y-4 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-[#c7c7bd]">find_in_page</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                No order found for "{activeQuery}"
              </h3>
              <p className="text-xs text-[#76786f] mt-1 max-w-md mx-auto">
                Please double-check your Order ID or phone number. You can also contact us on WhatsApp for live assistance.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to={RouteName.COLLECTIONS}
                className="px-6 py-2.5 bg-[#585e4c] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#717763] transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        ) : (
          matchedOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl shadow-[0px_12px_32px_rgba(140,146,125,0.08)] border border-[#e4e2de]/60 overflow-hidden"
            >
              {/* Order Header */}
              <div
                onClick={() => toggleTracking(ord.id)}
                className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#f5f3ef]/50 transition-colors group"
              >
                <div className="flex flex-col mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-mono font-bold text-2xl text-[#8e4d31]">
                      #{ord.id}
                    </span>
                    <span className="px-3 py-1 bg-[#585e4c]/10 text-[#585e4c] text-[10px] font-bold tracking-widest rounded-xl uppercase">
                      {ord.status || "Pending"}
                    </span>
                  </div>
                  <span className="text-xs text-[#76786f]">
                    Customer: <strong>{ord.customerName}</strong> • Phone: {ord.phone} • Date: {ord.date || "Recently"}
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
                <div className="bg-[#fbf9f5] border-t border-[#e4e2de]/60 p-6 md:p-10 animate-in fade-in duration-300 space-y-8">
                  {/* Progress Stepper Bar */}
                  <div className="relative w-full max-w-3xl mx-auto my-4">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 px-4 md:px-8">
                      <div className="h-0.5 w-full bg-[#e4e2de] relative overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full transition-all duration-500 bg-[#585e4c] ${
                            ord.status === "Delivered"
                              ? "w-full"
                              : ord.status === "Shipped"
                              ? "w-3/4"
                              : ord.status === "Processing"
                              ? "w-1/2"
                              : "w-1/4"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#585e4c] bg-[#585e4c] text-white flex items-center justify-center mb-2 shadow-sm">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#585e4c]">
                          Placed
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 shadow-sm ${
                            ord.status === "Processing" || ord.status === "Shipped" || ord.status === "Delivered"
                              ? "border-[#585e4c] bg-[#585e4c] text-white"
                              : "border-[#c7c7bd] bg-white text-gray-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                        </div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            ord.status === "Processing" || ord.status === "Shipped" || ord.status === "Delivered"
                              ? "text-[#585e4c]"
                              : "text-[#76786f]"
                          }`}
                        >
                          Processing
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 shadow-sm ${
                            ord.status === "Shipped" || ord.status === "Delivered"
                              ? "border-[#585e4c] bg-[#585e4c] text-white"
                              : "border-[#c7c7bd] bg-white text-gray-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">local_shipping</span>
                        </div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            ord.status === "Shipped" || ord.status === "Delivered"
                              ? "text-[#585e4c]"
                              : "text-[#76786f]"
                          }`}
                        >
                          Shipped
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 shadow-sm ${
                            ord.status === "Delivered"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-[#c7c7bd] bg-white text-gray-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">task_alt</span>
                        </div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            ord.status === "Delivered" ? "text-emerald-700" : "text-[#76786f]"
                          }`}
                        >
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ordered Products Grid & Images */}
                  <div className="space-y-4">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#1b1c1a] border-b border-[#e4e2de] pb-2 flex items-center justify-between">
                      <span>Ordered Items ({ord.itemsCount || (Array.isArray(ord.items) ? ord.items.reduce((acc: number, i: any) => acc + (i.quantity || 1), 0) : 1)})</span>
                      <span className="text-xs text-[#8e4d31] font-sans font-semibold">Payment: {ord.paymentMethod || "Verified"}</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.isArray(ord.items) && ord.items.length > 0 ? (
                        ord.items.map((item: any, idx: number) => (
                          <div key={item.id || idx} className="flex gap-4 items-center bg-[#f5f3ef] p-4 rounded-2xl border border-[#e4e2de] shadow-xs">
                            <img
                              src={item.image || artisanHandsImg}
                              alt={item.name}
                              className="w-20 h-24 object-cover rounded-xl bg-white flex-shrink-0 border border-[#e4e2de]"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = artisanHandsImg;
                              }}
                            />
                            <div className="flex-grow space-y-1">
                              <h5 className="font-display text-sm font-semibold text-[#1b1c1a] line-clamp-2">
                                {item.name}
                              </h5>
                              <p className="text-xs text-[#76786f]">Quantity: <strong className="text-[#1b1c1a]">{item.quantity || 1}</strong></p>
                              <p className="text-xs font-bold text-[#8e4d31]">
                                Rs. {Number((item.priceUSD ? item.priceUSD * 280 : (item.price ? item.price * 280 : 0)) || 0).toLocaleString()} PKR
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex gap-4 items-center bg-[#f5f3ef] p-4 rounded-2xl border border-[#e4e2de]">
                          <img src={artisanHandsImg} alt="Crochet Item" className="w-20 h-24 object-cover rounded-xl bg-white flex-shrink-0" />
                          <div>
                            <h5 className="font-display text-sm font-semibold text-[#1b1c1a]">Handcrafted Artisan Item</h5>
                            <p className="text-xs text-[#76786f]">100% natural organic yarn</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer & Shipping Summary */}
                  <div className="bg-[#f5f3ef] rounded-2xl p-5 border border-[#e4e2de] text-xs text-[#464840] space-y-2">
                    <div className="font-bold text-[#1b1c1a] text-sm border-b border-[#e4e2de] pb-1 flex items-center justify-between">
                      <span>Delivery & Customer Details</span>
                      <span className="text-xs text-[#585e4c] font-normal">Date: {ord.date}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      <p>📍 <strong>Shipping Address:</strong> {ord.customer?.address || ord.address || "Address Provided"}{ord.customer?.city ? `, ${ord.customer.city}` : ""}</p>
                      <p>📞 <strong>Phone Number:</strong> {ord.phone || ord.customer?.phone}</p>
                      <p>👤 <strong>Customer Name:</strong> {ord.customerName || ord.customer?.name}</p>
                      {ord.email && <p>✉️ <strong>Email Address:</strong> {ord.email}</p>}
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
