import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import socket from "../sockets/socket";
import API from "../api/axios";
import "../styles/pages/OrderTracking.css";

const orderSteps = ["Placed", "Preparing", "Ready for Pickup", "Completed"];
const statusMap = {
  placed: 0,
  in_progress: 1,
  ready: 2,
  completed: 3,
};

const STATUS_CONTENT = {
  placed: {
    title: "PLACED",
    text: "Your order has been placed.",
    time: "15 mins",
  },
  in_progress: {
    title: "IN PROGRESS",
    text: "We are preparing your order.",
    time: "10 mins",
  },
  ready: {
    title: "READY FOR PICKUP",
    text: "Your order is ready for pickup.",
    time: "Ready Now",
  },
  completed: {
    title: "COMPLETED",
    text: "Order completed successfully.",
    time: null,
  },
};

function OrderTracking() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState(null);

  const currentStepIndex = statusMap[order?.orderStatus] || 0;

  const currentStatus = order?.orderStatus || "placed";
  const statusUi = STATUS_CONTENT[currentStatus] || STATUS_CONTENT.placed;
  const isCompleted = currentStatus === "completed";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`/orders/${orderNumber}`);
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  useEffect(() => {
    socket.on("orderUpdated", (updatedOrder) => {
      if (updatedOrder.orderNumber == orderNumber) {
        setOrder(updatedOrder);
      }
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [orderNumber]);

  return (
    <>
      <NavBar cartCount={0} />

      <main className="tracking-page container">
        <div className="tracking-page__wrapper">
          <header className="tracking-page__header">
            <h1>Track Your Order</h1>
            <p>
              Order Number: <strong>{order?.orderNumber}</strong>
            </p>
          </header>

          <div className="tracking-page__info">
            <div className={`tracking-page__status-card ${isCompleted ? 'tracking-page__status-card--success' : ''}`}>
              <h2>Current Status</h2>
              <h3>{statusUi.title}</h3>
              <p>{statusUi.text}</p>

              {statusUi.time && (
                <div className="tracking-page__time">
                  Approx Wait Time: <strong>{statusUi.time}</strong>
                </div>
              )}

              {isCompleted && (
                <div className="tracking-page__completed-actions">
                  <p className="tracking-page__thank-you">Enjoy your order! Thank you for choosing us. 🎉</p>
                  <button 
                    onClick={() => window.location.href = "/"} 
                    className="tracking-page__btn-back"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>

            <div className="tracking-page__image-container">
              <img
                src={isCompleted ? "../src/assets/order-success.png" : "../src/assets/order-tracking.png"}
                alt={isCompleted ? "Order Successful" : "Order tracking"}
                className="tracking-page__image"
              />
            </div>
          </div>

          <section className="tracking-page__timeline-card">
            <h2>Order Progress</h2>

            <ol className="tracking-page__timeline">
              {orderSteps.map((step, index) => {
                // FIXED LOGIC: If the whole order is completed, every step is marked "completed".
                // Otherwise, it falls back to checking index vs currentStepIndex.
                const state = isCompleted
                  ? "completed"
                  : index < currentStepIndex
                    ? "completed"
                    : index === currentStepIndex
                      ? "active"
                      : "upcoming";

                return (
                  <li
                    key={step}
                    className={`tracking-page__step tracking-page__step--${state}`}
                  >
                    <span className="tracking-page__dot" />

                    <div className="tracking-page__step-content">
                      <h3>{step}</h3>
                      <p>
                        {state === "completed" && "Completed successfully"}
                        {state === "active" && "Currently being processed"}
                        {state === "upcoming" && "Waiting for next stage"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}

export default OrderTracking;