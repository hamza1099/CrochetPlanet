import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  quantity: number;
  category?: string;
}

export type Currency = "PKR" | "USD";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  subtotal: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "sweater-1",
      name: "Oatmeal Baby Cardigan",
      price: 55.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWPIWedTuhLodyUdzPRCyKOH7w56Y35m-epXJSMiLCqUuL1u2WEJaq9Bewr6m6whQEjedSbR6ICQ5uR5sxYa-PPvo0z60gqq2gTv-XXwffZLiPnxYVgIcuu-7ho0w5G1ev9fjK87NaSmKFb6J3no-Atrxfm46G5d01g2-vQKWsqkBZjk-G-Ckks_3dzwWxhxaGLICNFS-EwZtrdwXojxQaO6CYdUxLp0xUmFipOYKO2IAGuFswNfwMvw",
      quantity: 1,
      badge: "Best Seller",
    },
    {
      id: "blanket-1",
      name: "Heirloom Baby Blanket",
      price: 125.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCnXX5PO--YAQOTg52hHc6isfkQtlzl1wF96R_O6DBRKb_f2ab_YLZv0h6htZSd0qzWsK_1RdewQfxblGoT60NpvC3GRzji81ntDG29NKeSoUbbopDbIhaqWHh0HQ3t05MjTRashRx3wYula-12C3pHzC2cTbUJyFR_ZlgwTKGb2BN_df9mV0nrEn_GM5SVFYPm8b__XSV8eMJmrHkmFngx3eO2rmnl_RX-xLQPKN-eFy52LX1On6Xtxg",
      quantity: 1,
      badge: "Organic Cotton",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem("croch_currency") as Currency) || "PKR";
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("croch_currency", c);
  };

  // 1 USD = 280 PKR conversion rate for clean calculations
  const formatPrice = (amountInUSD: number) => {
    if (currency === "PKR") {
      const pkrAmount = Math.round(amountInUSD * 280);
      return `Rs. ${pkrAmount.toLocaleString()}`;
    }
    return `$${amountInUSD.toFixed(2)}`;
  };

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotal,
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
