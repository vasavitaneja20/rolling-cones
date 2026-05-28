import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import "../styles/pages/Cart.css";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  return (
    <>
      <NavBar cartCount={cartItems.reduce(
  (total, item) => total + (item.quantity || 1),
  0
)} />
      <main className="cart-page container">
        <header className="cart-page__header">
          <h1>Your Cart</h1>
          <p>Review your order before checkout.</p>
        </header>

        {cartItems.length === 0 ? (
          <section className="cart-page__empty">
            <h2>Your cart is empty</h2>
            <p>Add some delicious waffles from the menu.</p>
            <Link to="/menu" className="cart-page__menu-link">
              Go to Menu
            </Link>
          </section>
        ) : (
          <div className="cart-page__layout">
            <section className="cart-page__items">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.name}-${item.category}`}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity || 1}
                  onIncrease={() => addToCart(item)}
                  onDecrease={() => removeFromCart(item.name)}
                  onRemove={() => removeFromCart(item.name, true)}
                />
              ))}
            </section>

            <aside className="cart-page__summary">
              <h2>Order Summary</h2>
              <div className="cart-page__summary-row">
                <span>Items</span>
                <span>{cartItems.reduce(
  (total, item) => total + (item.quantity || 1),
  0
)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                type="button"
                className="cart-page__checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                className="cart-page__clear-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}

export default Cart;
