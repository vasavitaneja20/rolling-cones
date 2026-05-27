import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";
import { useCart } from "../context/CartContext";
import "../styles/pages/StaffDashboard.css";

function StaffDashboard() {
  const { cartItems } = useCart();
  const [filter, setFilter] = useState("all");

  const [orders, setOrders] = useState([
    {
      orderId: "TRC-2026-1081",
      items: [
        { name: "Nutella Blast", quantity: 2 },
        { name: "Cheese Corn Delight", quantity: 1 },
      ],
      totalAmount: 520,
      status: "In Progress",
    },
    {
      orderId: "TRC-2026-1082",
      items: [{ name: "Banana Split", quantity: 1 }],
      totalAmount: 190,
      status: "Ready",
    },
    {
      orderId: "TRC-2026-1083",
      items: [
        { name: "Cheese Corn Delight", quantity: 2 },
        { name: "Pizza Burst", quantity: 1 },
      ],
      totalAmount: 480,
      status: "In Progress",
    },
    {
      orderId: "TRC-2026-1084",
      items: [{ name: "Spicy Paneer Crunch", quantity: 1 }],
      totalAmount: 250,
      status: "Ready",
    },
  ]);

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => {
      const normalized = (o.status || "").toLowerCase();
      if (filter === "in-progress") return normalized === "in progress";
      if (filter === "ready") return normalized === "ready";
      return true;
    });
  }, [filter, orders]);

  const setOrderStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  return (
    <>
      <NavBar cartCount={cartItems.length} />
      <main className="staff-dashboard container">
        <header className="staff-dashboard__header">
          <h1>Staff Dashboard</h1>
          <p>Update order status and track what’s ready for pickup.</p>
        </header>

        <div className="staff-dashboard__filters" aria-label="Filter orders by status">
          <button
            type="button"
            className={`staff-dashboard__filter ${
              filter === "all" ? "is-active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`staff-dashboard__filter ${
              filter === "in-progress" ? "is-active" : ""
            }`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </button>
          <button
            type="button"
            className={`staff-dashboard__filter ${
              filter === "ready" ? "is-active" : ""
            }`}
            onClick={() => setFilter("ready")}
          >
            Ready
          </button>
        </div>

        <section className="staff-dashboard__grid" aria-label="Orders list">
          {filteredOrders.length === 0 ? (
            <div className="staff-dashboard__empty">
              <h2>No orders found</h2>
              <p>Try a different filter.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                orderId={order.orderId}
                items={order.items}
                totalAmount={order.totalAmount}
                status={order.status}
                onInProgress={() => setOrderStatus(order.orderId, "In Progress")}
                onReady={() => setOrderStatus(order.orderId, "Ready")}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default StaffDashboard;