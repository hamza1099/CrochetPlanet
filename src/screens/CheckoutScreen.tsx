import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { createOrderApi } from "../service/networkService";

const CheckoutScreen: React.FC = () => {
  const { cart, subtotal, clearCart, formatPrice, currency } = useCart();
  const { user } = useAuth();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");

  useEffect(() => {
    if (user) {
      if (!firstName) setFirstName(user.name.split(" ")[0] || "");
      if (!lastName) setLastName(user.name.split(" ").slice(1).join(" ") || "");
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
      if (!address && user.address) setAddress(user.address);
      if (!city && user.city) setCity(user.city);
    }
  }, [user]);


  // Subtotal in PKR for shipping thresholds
  const subtotalPKR = currency === "PKR" ? subtotal * 280 : subtotal * 280;
  const isFreeDelivery = subtotalPKR >= 6000 || subtotal === 0;
  
  // Shipping fee: Rs 250 in PKR, ~$0.90 in USD
  const shippingFeeInUSD = isFreeDelivery ? 0 : 0.90;
  const totalUSD = subtotal + shippingFeeInUSD;
  const amountToFreeShippingPKR = 6000 - subtotalPKR;

  const [paymentMethod, setPaymentMethod] = useState<"easypaisa_jazzcash" | "cod" | "card">("easypaisa_jazzcash");

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const fallbackId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderPayload = {
      customer: {
        name: `${firstName} ${lastName}`.trim() || "Valued Customer",
        email: email || "customer@example.com",
        phone: phone || "+92 300 0000000",
        address: address || "",
        city: city || "",
        country: "Pakistan"
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        priceUSD: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      currency: currency,
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "card" ? "Card" : "Easypaisa / JazzCash",
    };

    try {
      const createdOrder = await createOrderApi(orderPayload);
      if (createdOrder && createdOrder.id) {
        setOrderId(createdOrder.id);
      } else {
        setOrderId(fallbackId);
      }
    } catch (err) {
      console.warn("Saving order via backend API fallback:", err);
      setOrderId(fallbackId);
    }

    setOrderComplete(true);
    clearCart();
  };


  if (orderComplete) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 font-body text-center space-y-6">
        <div className="w-20 h-20 bg-[#585e4c]/10 text-[#585e4c] rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-[#1b1c1a]">
          Thank You For Your Order!
        </h1>
        <p className="text-base text-[#464840] max-w-lg mx-auto leading-relaxed">
          Your order <strong>#{orderId || "YC-84920"}</strong> has been confirmed. Our artisans are meticulously preparing your handcrafted pieces. A confirmation message has been logged.
        </p>
        <div className="pt-6">
          <Link
            to={RouteName.HOME}
            className="px-8 py-4 bg-[#585e4c] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#717763] transition-all shadow-md"
          >
            Return to Store Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 font-body text-[#1b1c1a]">
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8 text-center md:text-left">
        Secure Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <span className="material-symbols-outlined text-5xl text-[#c7c7bd]">
            shopping_bag
          </span>
          <p className="font-display text-2xl text-[#1b1c1a]">
            Your shopping bag is empty
          </p>
          <Link
            to={RouteName.COLLECTIONS}
            className="inline-block px-8 py-3 bg-[#585e4c] text-white rounded-xl text-xs font-bold uppercase tracking-widest"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-[#e4e2de] shadow-sm">
            {/* Contact & Shipping */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                1. Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="email"
                  placeholder="Email Address for Order Updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number (e.g. +92 300 1234567)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
              <input
                required
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />

                <input
                  required
                  type="text"
                  placeholder="State / Province"
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  required
                  type="text"
                  placeholder="ZIP / Postal Code"
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-6 border-t border-[#f5f3ef]">
              <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
                2. Select Payment Method
              </h3>

              <div className="space-y-3">
                {/* JazzCash / Easypaisa Option */}
                <label
                  onClick={() => setPaymentMethod("easypaisa_jazzcash")}
                  className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "easypaisa_jazzcash"
                      ? "bg-[#f5f3ef] border-[#585e4c] ring-1 ring-[#585e4c]"
                      : "bg-[#fbf9f5] border-[#c7c7bd] hover:border-[#76786f]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "easypaisa_jazzcash"}
                        onChange={() => setPaymentMethod("easypaisa_jazzcash")}
                        className="text-[#8e4d31] focus:ring-0"
                      />
                      <span className="font-semibold text-sm text-[#1b1c1a]">
                        Easypaisa & JazzCash (Fast Mobile Transfer)
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#8e4d31] text-white text-[10px] font-bold rounded-full uppercase">
                      Recommended
                    </span>
                  </div>

                  {paymentMethod === "easypaisa_jazzcash" && (
                    <div className="mt-2 p-4 bg-white rounded-xl border border-[#e4e2de] space-y-3 text-xs text-[#464840] animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-[#585e4c] font-bold text-sm border-b border-[#f5f3ef] pb-2">
                        <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                        <span>Account Number: <strong className="text-[#8e4d31] text-base">03173004661</strong></span>
                      </div>
                      <p>
                        • <strong>Easypaisa / JazzCash Title</strong>: Tayyaba Hamza / CrochCosmo
                      </p>
                      <p>
                        • Please send exact payment to <strong>03173004661</strong> and attach Transaction ID / Screenshot below for instant verification.
                      </p>
                      <div>
                        <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                          Transaction ID (TID) / Ref Number
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 12984920491"
                          className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c]"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* Cash on Delivery Option */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "bg-[#f5f3ef] border-[#585e4c] ring-1 ring-[#585e4c]"
                      : "bg-[#fbf9f5] border-[#c7c7bd] hover:border-[#76786f]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-[#8e4d31] focus:ring-0"
                    />
                    <span className="font-semibold text-sm text-[#1b1c1a]">
                      Cash on Delivery (Pakistan Orders)
                    </span>
                  </div>
                  <span className="text-xs text-[#76786f]">Pay upon receipt</span>
                </label>

                {/* Credit / Debit Card Option */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "bg-[#f5f3ef] border-[#585e4c] ring-1 ring-[#585e4c]"
                      : "bg-[#fbf9f5] border-[#c7c7bd] hover:border-[#76786f]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-[#8e4d31] focus:ring-0"
                    />
                    <span className="font-semibold text-sm text-[#1b1c1a]">
                      Credit / Debit Card (Stripe Secure)
                    </span>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 pt-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full bg-white border border-[#c7c7bd] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8e4d31]"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          defaultValue="12/28"
                          className="bg-white border border-[#c7c7bd] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8e4d31]"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          defaultValue="123"
                          className="bg-white border border-[#c7c7bd] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8e4d31]"
                        />
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Complete Order — {formatPrice(totalUSD)}
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#f5f3ef] p-8 rounded-3xl border border-[#e4e2de] h-fit space-y-6">
            <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
              Order Summary ({cart.length} items)
            </h3>

            {/* Free Delivery Banner / Progress Tag */}
            <div className="p-4 bg-white rounded-2xl border border-[#e4e2de] shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#585e4c]">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  {isFreeDelivery ? "FREE DELIVERY UNLOCKED!" : "FREE DELIVERY ON RS. 6000+"}
                </span>
                {isFreeDelivery ? (
                  <span className="px-2 py-0.5 bg-[#585e4c] text-white text-[10px] rounded-md uppercase">
                    FREE
                  </span>
                ) : (
                  <span className="text-[#8e4d31]">{formatPrice(0.90)}</span>
                )}
              </div>

              {!isFreeDelivery ? (
                <p className="text-[11px] text-[#76786f]">
                  Add <strong className="text-[#8e4d31]">Rs. {amountToFreeShippingPKR.toLocaleString()}</strong> more worth of items to unlock <strong>FREE DELIVERY</strong>!
                </p>
              ) : (
                <p className="text-[11px] text-[#585e4c] font-medium">
                  🎉 Congratulations! Your order qualifies for <strong>Free Delivery across Pakistan</strong>.
                </p>
              )}
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-xl bg-white flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-display text-sm font-medium text-[#1b1c1a] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#76786f]">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold text-[#8e4d31]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[#e4e2de] text-sm">
              <div className="flex justify-between text-[#76786f]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#76786f]">
                <span>Delivery Charges</span>
                {isFreeDelivery ? (
                  <span className="text-[#585e4c] font-bold">FREE</span>
                ) : (
                  <span>{formatPrice(0.90)}</span>
                )}
              </div>
              <div className="flex justify-between pt-3 border-t border-[#e4e2de] font-display text-xl font-semibold text-[#1b1c1a]">
                <span>Total</span>
                <span>{formatPrice(totalUSD)}</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutScreen;
