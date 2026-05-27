import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar cartCount={0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;