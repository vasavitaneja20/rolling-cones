import { useCart } from "../context/CartContext";
import "./../styles/components/FoodCard.css";

function FoodCard({
  name,
  category,
  description,
  price,
  imageUrl,
  available,
  onAddToCart,
}) {

  const { cartItems, addToCart, removeFromCart } = useCart();

  const safeCategory = (category || "").toLowerCase();

  const isAvailable = Boolean(available);

  const cartItem = cartItems.find(
    (item) => item.name === name
  );

  const quantity = cartItem?.quantity || 0;

  return (
    <article className="food-card">

      <img
        src={imageUrl}
        alt={name}
        className="food-card__image"
      />

      <div className="food-card__content">

        <div className="food-card__top-row">

          <h3 className="food-card__name">
            {name}
          </h3>

          <span
            className={`food-card__badge food-card__badge--${safeCategory}`}
          >
            {safeCategory}
          </span>

        </div>

        <p className="food-card__description">
          {description}
        </p>

        <p className="food-card__price">
          ₹{price}
        </p>

        {!isAvailable ? (

          <button
            className="food-card__button"
            disabled
          >
            Out of Stock
          </button>

        ) : quantity === 0 ? (

          <button
            type="button"
            className="food-card__button"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>

        ) : (

          <div className="food-card__quantity">

            <button
              className="food-card__quantity-btn"
              onClick={() => removeFromCart(name)}
            >
              −
            </button>

            <span className="food-card__quantity-count">
              {quantity}
            </span>

            <button
              className="food-card__quantity-btn"
              onClick={() =>
                addToCart({
                  name,
                  category,
                  description,
                  price,
                  imageUrl,
                  available,
                })
              }
            >
              +
            </button>

          </div>

        )}

      </div>

    </article>
  );
}

export default FoodCard;