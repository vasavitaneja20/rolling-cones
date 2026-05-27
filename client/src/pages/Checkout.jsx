import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import "../styles/pages/Checkout.css";
import "../styles/pages/Checkout.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../api/orderApi";

function Checkout() {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  const handlePayment = async () => {
    try {
      if (!customerName || !phoneNumber) {
        alert("Please fill all details");

        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty");

        return;
      }

      setLoading(true);

      // CREATE ORDER IN DB
      const backendOrder = await createOrder({
        customerName,
        phoneNumber,
        items: cartItems,
        totalAmount,
      });

      // CREATE RAZORPAY ORDER
      const razorpayOrder = await createRazorpayOrder(totalAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "The Rolling Cones",

        description: "Waffle Order Payment",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              orderId: backendOrder._id,
            });

            navigate(`/tracking?order=${backendOrder.orderNumber}`);
          } catch (error) {
            console.error(error);

            alert("Payment verification failed");
          }
        },

        prefill: {
          name: customerName,
          contact: phoneNumber,
        },

        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.error(error);

      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar cartCount={cartItems.length} />

      <main className="checkout-page container">
        <header className="checkout-page__header">
          <h1>Checkout</h1>
          <p>Enter your details and review your order.</p>
        </header>

        <div className="checkout-page__layout">
          {/* Customer details */}

          <section className="checkout-page__form-card">
            <h2>Customer Details</h2>

            <label className="checkout-page__label">Name</label>

            <input
              className="checkout-page__input"
              type="text"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label className="checkout-page__label">Phone Number</label>

            <input
              className="checkout-page__input"
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* Payment section */}

            <div className="checkout-page__payment">
              <h2>Payment Method</h2>

              <label className="checkout-page__payment-card">
                <input type="radio" checked readOnly />

                <div>
                  <strong>Online Payment</strong>

                  <p>Secure payment through Razorpay</p>
                </div>
              </label>
            </div>
          </section>

          {/* Order summary */}

          <aside className="checkout-page__summary-card">
            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="checkout-page__empty">No items in cart yet</p>
            ) : (
              <ul className="checkout-page__items">
                {cartItems.map((item) => (
                  <li
                    key={`${item.name}-${item.category}`}
                    className="checkout-page__item"
                  >
                    <span>
                      {item.name} × {item.quantity || 1}
                    </span>

                    <span>₹{item.price * (item.quantity || 1)}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="checkout-page__total">
              <span>Total Amount</span>

              <strong>₹{totalAmount}</strong>
            </div>

            <button
              className="checkout-page__pay-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Checkout;
