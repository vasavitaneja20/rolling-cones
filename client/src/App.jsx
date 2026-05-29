import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import OrderHistory from "./pages/orderHistory";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;