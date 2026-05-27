import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import "../styles/pages/Checkout.css";

function Checkout() {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

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

            <label className="checkout-page__label">
              Name
            </label>

            <input
              className="checkout-page__input"
              type="text"
              placeholder="Enter your full name"
            />

            <label className="checkout-page__label">
              Phone Number
            </label>

            <input
              className="checkout-page__input"
              type="tel"
              placeholder="Enter phone number"
            />

            {/* Payment section */}

            <div className="checkout-page__payment">

              <h2>Payment Method</h2>

              <label className="checkout-page__payment-card">

                <input
                  type="radio"
                  checked
                  readOnly
                />

                <div>

                  <strong>
                    Online Payment
                  </strong>

                  <p>
                    Secure payment through Razorpay
                  </p>

                </div>

              </label>

            </div>

          </section>


          {/* Order summary */}

          <aside className="checkout-page__summary-card">

            <h2>Order Summary</h2>

            {cartItems.length===0 ? (

              <p className="checkout-page__empty">
                No items in cart yet
              </p>

            ) : (

              <ul className="checkout-page__items">

                {cartItems.map(item=>(
                  <li
                    key={`${item.name}-${item.category}`}
                    className="checkout-page__item"
                  >
                    <span>

                      {item.name} × {item.quantity || 1}

                    </span>

                    <span>

                    ₹{item.price*(item.quantity||1)}

                    </span>

                  </li>
                ))}

              </ul>

            )}

            <div className="checkout-page__total">

              <span>Total Amount</span>

              <strong>

                ₹{totalAmount}

              </strong>

            </div>

            <button
              className="checkout-page__pay-btn"
            >

              Proceed to Payment

            </button>

          </aside>

        </div>

      </main>
    </>
  );
}

export default Checkout;