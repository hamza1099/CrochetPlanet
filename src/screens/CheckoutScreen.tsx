import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const CheckoutScreen: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingFee = cart.length > 0 ? 15.0 : 0.0;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
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
          Your order <strong>#YC-84920</strong> has been confirmed. Our artisans are meticulously wrapping your handcrafted pieces. A confirmation email has been sent to your inbox.
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
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 font-body text-[#1b1c1a]">
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
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email Address for Order Updates"
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
              <input
                required
                type="text"
                placeholder="Street Address"
                className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  required
                  type="text"
                  placeholder="City"
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  required
                  type="text"
                  placeholder="State/Province"
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
                2. Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="text-[#8e4d31] focus:ring-0"
                  />
                  <span className="font-medium text-sm text-[#1b1c1a]">
                    Credit Card / Debit Card (Stripe Secure)
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="text-[#8e4d31] focus:ring-0"
                  />
                  <span className="font-medium text-sm text-[#1b1c1a]">
                    Cash on Delivery (Local Pakistan Orders)
                  </span>
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  defaultValue="4242 •••• •••• 4242"
                  className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="12/28"
                    className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="123"
                    className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Complete Order — ${total.toFixed(2)}
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#f5f3ef] p-8 rounded-3xl border border-[#e4e2de] h-fit space-y-6">
            <h3 className="font-display text-xl font-semibold text-[#1b1c1a]">
              Order Summary ({cart.length} items)
            </h3>

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
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[#e4e2de] text-sm">
              <div className="flex justify-between text-[#76786f]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#76786f]">
                <span>Tracked Express Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#e4e2de] font-display text-xl font-semibold text-[#1b1c1a]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutScreen;
