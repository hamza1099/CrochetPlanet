import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalCount } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-[#30312e]/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Side Cart Drawer */}
      <aside className="bg-[#ffffff] shadow-2xl fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 transition-transform duration-500 ease-in-out flex flex-col p-6 sm:p-8 font-body">
        {/* Drawer Header */}
        <div className="flex justify-between items-start pb-6 border-b border-[#e4e2de]">
          <div>
            <h2 className="font-display text-2xl font-medium text-[#8e4d31]">
              Your Selection ({totalCount})
            </h2>
            <p className="text-xs text-[#76786f] mt-1">
              Supporting handmade artisan craft & local women
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#464840] hover:text-[#8e4d31] transition-colors p-2 rounded-full hover:bg-[#f5f3ef]"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto py-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-[#c7c7bd] mb-3 block">
                shopping_bag
              </span>
              <p className="font-display text-lg text-[#1b1c1a] mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-[#76786f] mb-6">
                Explore our luxury handmade crochet pieces
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#585e4c] text-white rounded-lg text-xs uppercase tracking-widest hover:bg-[#717763] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 pb-6 border-b border-[#f5f3ef] group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-xl bg-[#efeeea] flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="font-display text-base text-[#1b1c1a] truncate mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#8e4d31] mb-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#c7c7bd] rounded-lg overflow-hidden bg-[#fbf9f5]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-xs text-[#464840] hover:bg-[#eae8e4] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#1b1c1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-xs text-[#464840] hover:bg-[#eae8e4] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#ba1a1a] hover:text-[#93000a] text-xs font-medium underline transition-colors ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-[#e4e2de] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#76786f]">Subtotal</span>
              <span className="font-display text-xl font-semibold text-[#1b1c1a]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-[#76786f] text-center">
              Free luxury gift packaging & worldwide shipping options available.
            </p>
            <Link
              to={RouteName.CHECKOUT}
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Proceed to Secure Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
