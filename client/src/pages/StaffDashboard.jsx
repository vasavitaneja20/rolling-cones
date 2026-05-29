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

  // const [historyOrders, setHistoryOrders] = useState([]);

  // const [historyPage, setHistoryPage] = useState(1);

  // const [hasMoreHistory, setHasMoreHistory] = useState(true);

  // const HISTORY_LIMIT = 10;

  // FETCH ACTIVE ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/api/orders");

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  // FETCH HISTORY ORDERS
  // useEffect(() => {
  //   const fetchHistoryOrders = async () => {
  //     try {
  //       const response = await API.get(
  //         `/orders/history?page=${historyPage}&limit=${HISTORY_LIMIT}`,
  //       );

  //       setHistoryOrders(response.data.orders);

  //       setHasMoreHistory(response.data.hasMore);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchHistoryOrders();
  // }, [historyPage]);

  // SOCKET LIVE UPDATES
  useEffect(() => {
    socket.on("orderUpdated", (updatedOrder) => {
      // UPDATE ACTIVE ORDERS
      setOrders((prevOrders) => {
        const exists = prevOrders.find(
          (o) => o.orderNumber === updatedOrder.orderNumber,
        );

        // REMOVE FROM LIVE IF COMPLETED
        if (updatedOrder.orderStatus === "completed") {
          return prevOrders.filter(
            (o) => o.orderNumber !== updatedOrder.orderNumber,
          );
        }

        // NEW ORDER
        if (!exists) {
          return [updatedOrder, ...prevOrders];
        }

        // UPDATE EXISTING
        return prevOrders.map((o) =>
          o.orderNumber === updatedOrder.orderNumber ? updatedOrder : o,
        );
      });

      // UPDATE HISTORY
      if (updatedOrder.orderStatus === "completed") {
        setHistoryOrders((prev) => [updatedOrder, ...prev]);
      }
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, []);

  // FILTER ACTIVE ORDERS
  const filteredOrders = useMemo(() => {
    // ALL ACTIVE
    if (filter === "all") {
      return orders.filter((order) => order.orderStatus !== "completed");
    }

    return orders.filter((o) => {
      const normalized = (o.orderStatus || "").toLowerCase();

      if (filter === "in-progress") {
        return normalized === "in_progress";
      }

      if (filter === "ready") {
        return normalized === "ready";
      }

      return true;
    });
  }, [filter, orders]);

  // UPDATE STATUS
  const setOrderStatus = async (orderId, nextStatus) => {
    try {
      await API.put(`/api/orders/${orderId}/status`, {
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

          <p>Update order status and track kitchen workflow.</p>
        </header>

        {/* ACTIVE ORDER FILTERS */}
        <div className="staff-dashboard__top-actions">
          <button
            onClick={() => (window.location.href = "/order-history")}
            className="staff-dashboard__history-btn"
          >
            View Order History
          </button>
        </div>
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
            All Active
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

        {/* ACTIVE ORDERS */}

        <section className="staff-dashboard__grid" aria-label="Active orders">
          {filteredOrders.length === 0 ? (
            <div className="staff-dashboard__empty">
              <h2>No active orders</h2>

              <p>Kitchen queue is clear.</p>
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
                onCompleted={() =>
                  setOrderStatus(order.orderNumber, "completed")
                }
              />
            ))
          )}
        </section>

        {/* HISTORY SECTION */}

        
      </main>
    </>
  );
}

export default StaffDashboard;

// <section className="staff-dashboard__history">
//           <div className="staff-dashboard__history-header">
//             <h2>Order History</h2>

//             <p>Completed and archived orders</p>
//           </div>

//           <div className="staff-dashboard__grid">
//             {historyOrders.length === 0 ? (
//               <div className="staff-dashboard__empty">
//                 <h2>No history found</h2>
//               </div>
//             ) : (
//               historyOrders.map((order) => (
//                 <OrderCard
//                   key={order.orderNumber}
//                   orderId={order.orderNumber}
//                   items={order.items}
//                   totalAmount={order.totalAmount}
//                   status={order.orderStatus}
//                 />
//               ))
//             )}
//           </div>

//           {/* PAGINATION */}

//           <div className="staff-dashboard__pagination">
//             <button
//               onClick={() => setHistoryPage((prev) => prev - 1)}
//               disabled={historyPage === 1}
//             >
//               Previous
//             </button>

//             <span>Page {historyPage}</span>

//             <button
//               onClick={() => setHistoryPage((prev) => prev + 1)}
//               disabled={!hasMoreHistory}
//             >
//               Next
//             </button>
//           </div>
//         </section>