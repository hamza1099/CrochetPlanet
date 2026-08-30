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
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);

  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [stateProv, setStateProv] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"easypaisa_jazzcash" | "cod" | "ubl_bank" | "international_whatsapp">("easypaisa_jazzcash");
  const [senderAccount, setSenderAccount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshotBase64, setScreenshotBase64] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
  
  const shippingFeeInUSD = isFreeDelivery ? 0 : 0.90;
  const totalUSD = subtotal + shippingFeeInUSD;
  const amountToFreeShippingPKR = 6000 - subtotalPKR;

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if ((paymentMethod === "easypaisa_jazzcash" || paymentMethod === "ubl_bank") && (!transactionId || !senderAccount || !screenshotBase64)) {
      setToast({
        message: "Please provide Sender Account, Transaction ID, and upload your payment screenshot.",
        type: "error"
      });
      return;
    }

    setIsSubmitting(true);
    const fallbackId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderPayload = {
      id: fallbackId,
      customer: {
        name: `${firstName} ${lastName}`.trim() || "Valued Customer",
        email: email || "customer@example.com",
        phone: phone || "+92 300 0000000",
        address: address || "",
        city: city || "",
        state: stateProv || "N/A",
        zipCode: zipCode || "N/A",
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
      paymentMethod: paymentMethod === "cod" 
        ? "Cash on Delivery" 
        : paymentMethod === "ubl_bank" 
        ? "UBL Bank Transfer" 
        : paymentMethod === "international_whatsapp"
        ? "International Order (WhatsApp Confirmation)"
        : "Easypaisa & JazzCash",
      paymentDetails: (paymentMethod === "easypaisa_jazzcash" || paymentMethod === "ubl_bank") ? {
        methodName: paymentMethod === "ubl_bank" ? "UBL Bank Transfer" : "Easypaisa & JazzCash Mobile Transfer",
        accountTitle: paymentMethod === "ubl_bank" ? "Hamza Arif" : "Tayyaba Hamza / CrochCosmo",
        accountNumber: paymentMethod === "ubl_bank" ? "0234286075013" : "03173004661",
        iban: paymentMethod === "ubl_bank" ? "PK28UNIL0109000286075013" : undefined,
        senderAccount,
        transactionId,
        screenshotBase64
      } : paymentMethod === "international_whatsapp" ? {
        methodName: "International Order (WhatsApp Confirmation)",
        note: "Customer requested WhatsApp confirmation for international shipping rates & payment options"
      } : {
        methodName: "Cash on Delivery",
        note: "Payment to be collected upon delivery receipt"
      },
    };

    let finalId = fallbackId;
    try {
      const createdOrder = await createOrderApi(orderPayload);
      if (createdOrder && createdOrder.id) {
        finalId = createdOrder.id;
      }
      
      setOrderId(finalId);
      setLastOrderDetails({ ...orderPayload, id: finalId, totalUSD });

      // Save order ID and customer phone to local storage for quick tracking on this device
      try {
        const existing = JSON.parse(localStorage.getItem("recentOrderIds") || "[]");
        if (!existing.includes(finalId)) {
          existing.unshift(finalId);
          localStorage.setItem("recentOrderIds", JSON.stringify(existing.slice(0, 10)));
        }
        if (phone) {
          localStorage.setItem("customerPhone", phone);
        }
      } catch (e) {
        console.warn("Failed saving recent order id to storage", e);
      }

      setToast({ message: `Order #${finalId} placed successfully!`, type: "success" });
      setOrderComplete(true);

      // Prepare rich WhatsApp notification message to store admin (+92 317 3004661)
      const itemsFormatted = cart.map(i => `• ${i.name} (Qty: ${i.quantity})`).join("\n");
      const waText = 
        `🛍️ *NEW ORDER RECEIVED!*\n` +
        `-----------------------------------\n` +
        `📌 *Tracking ID:* #${finalId}\n` +
        `👤 *Customer Name:* ${orderPayload.customer.name}\n` +
        `📞 *Customer Phone:* ${orderPayload.customer.phone}\n` +
        `📍 *Delivery Address:* ${orderPayload.customer.address}, ${orderPayload.customer.city}\n` +
        `💳 *Payment Method:* ${orderPayload.paymentMethod}\n` +
        `💰 *Total Amount:* $${totalUSD.toFixed(2)} USD (Rs. ${Math.round(totalUSD * 280).toLocaleString()} PKR)\n\n` +
        `🛒 *Ordered Items:* \n${itemsFormatted}\n` +
        `-----------------------------------\n` +
        `Please confirm & process this order.`;

      const ownerWaUrl = `https://wa.me/923173004661?text=${encodeURIComponent(waText)}`;
      
      // Auto open WhatsApp in a new tab for immediate admin notification
      setTimeout(() => {
        try {
          window.open(ownerWaUrl, "_blank");
        } catch (e) {
          console.warn("Auto open WhatsApp blocked by browser pop-up setting:", e);
        }
      }, 400);

      clearCart();
    } catch (err: any) {
      console.error("Saving order via Firebase error:", err);
      setToast({
        message: err?.message || "Failed to place order. Please check internet connection and try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (orderComplete) {
    const itemsFormatted = lastOrderDetails?.items ? lastOrderDetails.items.map((i: any) => `• ${i.name} (Qty: ${i.quantity})`).join("\n") : "";
    const waText = lastOrderDetails ? 
      `🛍️ *NEW ORDER RECEIVED!*\n` +
      `-----------------------------------\n` +
      `📌 *Tracking ID:* #${orderId}\n` +
      `👤 *Customer Name:* ${lastOrderDetails.customer.name}\n` +
      `📞 *Customer Phone:* ${lastOrderDetails.customer.phone}\n` +
      `📍 *Delivery Address:* ${lastOrderDetails.customer.address}, ${lastOrderDetails.customer.city}\n` +
      `💳 *Payment Method:* ${lastOrderDetails.paymentMethod}\n` +
      `💰 *Total Amount:* $${lastOrderDetails.totalUSD ? lastOrderDetails.totalUSD.toFixed(2) : '0.00'} USD (Rs. ${Math.round((lastOrderDetails.totalUSD || 0) * 280).toLocaleString()} PKR)\n\n` +
      `🛒 *Ordered Items:* \n${itemsFormatted}\n` +
      `-----------------------------------\n` +
      `Please confirm & process this order.` : 
      `Hi! I just placed order #${orderId}. Please confirm my order details.`;

    const ownerWaUrl = `https://wa.me/923173004661?text=${encodeURIComponent(waText)}`;

    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 font-body text-center space-y-6">
        <div className="w-20 h-20 bg-[#585e4c]/10 text-[#585e4c] rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-[#1b1c1a]">
          Thank You For Your Order!
        </h1>
        <p className="text-base text-[#464840] max-w-lg mx-auto leading-relaxed">
          Your order has been placed successfully! Below is your unique Order Tracking ID:
        </p>

        {/* Tracking ID Box */}
        <div className="max-w-md mx-auto p-6 bg-[#f5f3ef] border border-[#e4e2de] rounded-2xl space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#76786f] block">
            Your Tracking ID
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-[#8e4d31] tracking-wider">
              {orderId}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(orderId);
                alert("Tracking ID copied to clipboard!");
              }}
              className="px-3 py-1 bg-[#585e4c] text-white rounded-lg text-xs font-bold hover:bg-[#717763] transition-colors"
            >
              Copy ID
            </button>
          </div>
          <p className="text-xs text-[#76786f]">
            Please save or screenshot this ID. Our team will also contact you on WhatsApp with delivery updates.
          </p>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={ownerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>Send Order Notification to Admin WhatsApp</span>
          </a>
          <Link
            to={RouteName.ORDERS}
            className="px-8 py-4 bg-[#8e4d31] text-[#ffffff] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#71361d] transition-all shadow-md"
          >
            Track Order Live →
          </Link>
          <Link
            to={RouteName.HOME}
            className="px-8 py-4 bg-[#f5f3ef] text-[#1b1c1a] border border-[#c7c7bd] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#e4e2de] transition-all"
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
            {toast && (
              <div
                className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs transition-all ${
                  toast.type === "error"
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    {toast.type === "error" ? "error" : "check_circle"}
                  </span>
                  <span>{toast.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="text-gray-500 hover:text-black font-mono text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {/* International Shipping Notice Card (Luxury Boutique Style) */}
            <div className="p-5 bg-[#fbf9f5] border border-[#e4e2de] rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#585e4c]/10 text-[#585e4c] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">public</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold text-sm text-[#1b1c1a]">
                      Worldwide Shipping Available ✈️
                    </h4>
                    <span className="px-2 py-0.5 bg-[#585e4c]/10 text-[#585e4c] text-[10px] font-bold uppercase rounded-md">
                      Overseas
                    </span>
                  </div>
                  <p className="text-xs text-[#76786f]">
                    Ordering outside Pakistan? Select <strong className="text-[#8e4d31] font-semibold">"International Order"</strong> under payment methods below.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/923173004661?text=Hi!%20I%20want%20to%20place%20an%20international%20order%20from%20outside%20Pakistan."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#585e4c] hover:bg-[#484d3e] text-white text-xs font-bold rounded-xl flex-shrink-0 transition-all shadow-xs self-end sm:self-auto"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>WhatsApp Support</span>
              </a>
            </div>

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
                  type="text"
                  placeholder="State / Province"
                  value={stateProv}
                  onChange={(e) => setStateProv(e.target.value)}
                  className="bg-[#fbf9f5] border border-[#c7c7bd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8e4d31]"
                />
                <input
                  type="text"
                  placeholder="ZIP / Postal Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
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
                    <div className="mt-2 p-4 bg-white rounded-xl border border-[#e4e2de] space-y-4 text-xs text-[#464840] animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-[#585e4c] font-bold text-sm border-b border-[#f5f3ef] pb-2">
                        <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                        <span>Account Number: <strong className="text-[#8e4d31] text-base">03173004661</strong></span>
                      </div>
                      <div className="space-y-1">
                        <p>• <strong>Easypaisa / JazzCash Title</strong>: Tayyaba Hamza / CrochCosmo</p>
                        <p>• Please send exact payment to <strong>03173004661</strong> and attach your Transaction ID & Screenshot below for instant verification.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                            Sender Account / Phone No.
                          </label>
                          <input
                            type="text"
                            required
                            value={senderAccount}
                            onChange={(e) => setSenderAccount(e.target.value)}
                            placeholder="e.g. 03001234567"
                            className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                            Transaction ID (TID) / Ref Number
                          </label>
                          <input
                            type="text"
                            required
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 12984920491"
                            className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                          Upload Payment Screenshot
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleScreenshotUpload}
                          className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c] file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#585e4c] file:text-white hover:file:bg-[#717763]"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* UBL Bank Transfer Option */}
                <label
                  onClick={() => setPaymentMethod("ubl_bank")}
                  className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "ubl_bank"
                      ? "bg-[#f5f3ef] border-[#585e4c] ring-1 ring-[#585e4c]"
                      : "bg-[#fbf9f5] border-[#c7c7bd] hover:border-[#76786f]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "ubl_bank"}
                        onChange={() => setPaymentMethod("ubl_bank")}
                        className="text-[#8e4d31] focus:ring-0"
                      />
                      <span className="font-semibold text-sm text-[#1b1c1a]">
                        UBL Bank Transfer
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "ubl_bank" && (
                    <div className="mt-2 p-4 bg-white rounded-xl border border-[#e4e2de] space-y-4 text-xs text-[#464840] animate-in fade-in duration-200">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-[#585e4c] font-bold text-sm border-b border-[#f5f3ef] pb-3">
                        <span className="material-symbols-outlined text-3xl">account_balance</span>
                        <div>
                          <div className="text-xs text-[#76786f] uppercase tracking-wider">Account Number</div>
                          <strong className="text-[#8e4d31] text-base tracking-widest font-mono">0234286075013</strong>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <p className="flex justify-between border-b border-dashed border-[#e4e2de] pb-1">
                          <span className="text-[#76786f]">Account Title:</span>
                          <strong className="text-[#1b1c1a]">Hamza Arif</strong>
                        </p>
                        <p className="flex justify-between border-b border-dashed border-[#e4e2de] pb-1">
                          <span className="text-[#76786f]">Bank Name:</span>
                          <strong className="text-[#1b1c1a]">UBL (United Bank Limited)</strong>
                        </p>
                        <p className="flex flex-col md:flex-row justify-between pt-1">
                          <span className="text-[#76786f]">IBAN:</span>
                          <strong className="text-[#1b1c1a] font-mono text-[11px] md:text-xs">PK28UNIL0109000286075013</strong>
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e4e2de]">
                        <div>
                          <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                            Sender Account No / Name
                          </label>
                          <input
                            type="text"
                            required
                            value={senderAccount}
                            onChange={(e) => setSenderAccount(e.target.value)}
                            placeholder="e.g. Ali Khan / 12345678"
                            className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                            Transaction ID (TID) / Ref Number
                          </label>
                          <input
                            type="text"
                            required
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 12984920491"
                            className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#76786f] uppercase mb-1">
                          Upload Payment Screenshot
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleScreenshotUpload}
                          className="w-full bg-[#fbf9f5] border border-[#c7c7bd] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#585e4c] file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#585e4c] file:text-white hover:file:bg-[#717763]"
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

                {/* International / Overseas Order (WhatsApp Confirmation) Option */}
                <label
                  onClick={() => setPaymentMethod("international_whatsapp")}
                  className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "international_whatsapp"
                      ? "bg-[#e8f8ef] border-[#25D366] ring-1 ring-[#25D366]"
                      : "bg-[#fbf9f5] border-[#c7c7bd] hover:border-[#76786f]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "international_whatsapp"}
                        onChange={() => setPaymentMethod("international_whatsapp")}
                        className="text-[#25D366] focus:ring-0"
                      />
                      <span className="font-semibold text-sm text-[#1b1c1a]">
                        ✈️ International / Overseas Order (WhatsApp Confirmation)
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#25D366] text-white text-[10px] font-bold rounded-full uppercase">
                      Worldwide
                    </span>
                  </div>

                  {paymentMethod === "international_whatsapp" && (
                    <div className="mt-2 p-4 bg-white rounded-xl border border-[#c1ebd3] space-y-3 text-xs text-[#464840] animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-[#1c7843] font-bold text-sm border-b border-[#e8f8ef] pb-2">
                        <span className="material-symbols-outlined text-lg">public</span>
                        <span>Global Delivery & Live WhatsApp Support</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-[#333]">
                        <p>• <strong>Easy Process</strong>: Place your order now without online advance payment.</p>
                        <p>• <strong>International Shipping</strong>: Shipping charges (DHL / SkyNet / FedEx) will be calculated based on your destination country & package weight.</p>
                        <p>• <strong>Payment Link</strong>: Our team will contact you on <strong>WhatsApp (+92 317 3004661)</strong> with live shipping quotes & international card / remittance payment link.</p>
                      </div>
                      <div className="p-3 bg-[#e8f8ef] rounded-lg border border-[#c1ebd3] flex items-center justify-between gap-2 text-[11px] font-semibold text-[#1c7843]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">chat</span>
                          <span>Assistance: +92 317 3004661</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 rounded">Fast Reply</span>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-[#76786f] cursor-not-allowed text-white opacity-80"
                  : paymentMethod === "international_whatsapp"
                  ? "bg-[#25D366] hover:bg-[#20ba59] text-white"
                  : "bg-[#585e4c] hover:bg-[#717763] text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">sync</span>
                  <span>Processing Order...</span>
                </>
              ) : paymentMethod === "international_whatsapp" ? (
                <span>Place International Order & Connect on WhatsApp ✈️</span>
              ) : (
                <span>Complete Order — {formatPrice(totalUSD)}</span>
              )}
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
              {cart.map((item) => {
                const match = item.name.match(/^(.*?)\s*\((.*)\)$/);
                const title = match ? match[1] : item.name;
                const detailsString = match ? match[2] : "";
                const details = detailsString
                  ? detailsString.split(/,(?![^\(\)]*\))/).map((s) => s.trim())
                  : [];

                return (
                  <div key={item.id} className="flex gap-3.5 items-start py-3 border-b border-[#e4e2de]/60 last:border-0">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-16 h-20 object-cover rounded-xl bg-white flex-shrink-0 shadow-xs border border-[#e4e2de]"
                    />
                    <div className="flex-grow min-w-0 space-y-1.5">
                      <h4 className="font-display text-xs font-semibold text-[#1b1c1a] leading-tight">
                        {title}
                      </h4>
                      {details.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {details.map((d, idx) => {
                            const isSize = d.toLowerCase().includes("size:");
                            const isEmbroidery = d.toLowerCase().includes("embroidery:");

                            return (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium leading-tight border ${
                                  isSize
                                    ? "bg-[#8e4d31]/10 text-[#8e4d31] border-[#8e4d31]/20"
                                    : isEmbroidery
                                    ? "bg-purple-50 text-purple-800 border-purple-200"
                                    : "bg-[#585e4c]/10 text-[#3a3f32] border-[#585e4c]/20"
                                }`}
                              >
                                {isSize ? "📏 " : isEmbroidery ? "🪡 " : "🎨 "}
                                <span>{d}</span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[#76786f] text-[11px]">Qty: {item.quantity}</span>
                        <span className="font-bold text-[#8e4d31]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
