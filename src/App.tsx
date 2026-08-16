import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import InitRoute from "./routes/InitRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
          <Navbar />
          <main className="flex-grow">
            <InitRoute />
          </main>
          <CartDrawer />
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
