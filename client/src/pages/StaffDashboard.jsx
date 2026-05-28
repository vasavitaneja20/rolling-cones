import { useMemo, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";
import { useCart } from "../context/CartContext";
import "../styles/pages/StaffDashboard.css";
import API from "../api/axios";

import socket from "../sockets/socket";

function StaffDashboard() {
  const { cartItems } = useCart();
  const [filter, setFilter] = useState("all");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prevOrders) => {
        const exists = prevOrders.find(
          (o) => o.orderNumber === updatedOrder.orderNumber,
        );

        if (!exists) {
          return [updatedOrder, ...prevOrders];
        }

        return prevOrders.map((o) =>
          o.orderNumber === updatedOrder.orderNumber ? updatedOrder : o,
        );
      });
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, []);

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => {
      const normalized = (o.orderStatus || "").toLowerCase();
      if (filter === "in-progress") return normalized === "in_progress";
      if (filter === "ready") return normalized === "ready";
      return true;
    });
  }, [filter, orders]);

  const setOrderStatus = async (orderId, nextStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        status: nextStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar cartCount={cartItems.length} />
      <main className="staff-dashboard container">
        <header className="staff-dashboard__header">
          <h1>Staff Dashboard</h1>
          <p>Update order status and track what’s ready for pickup.</p>
        </header>

        <div
          className="staff-dashboard__filters"
          aria-label="Filter orders by status"
        >
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
                key={order.orderNumber}
                orderId={order.orderNumber}
                items={order.items}
                totalAmount={order.totalAmount}
                status={order.orderStatus}
                onInProgress={() =>
                  setOrderStatus(order.orderNumber, "in_progress")
                }
                onReady={() => setOrderStatus(order.orderNumber, "ready")}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default StaffDashboard;
