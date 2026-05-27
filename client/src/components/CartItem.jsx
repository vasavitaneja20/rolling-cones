import "../styles/components/CartItem.css";

function CartItem({
  imageUrl,
  name,
  price,
  quantity = 1,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article className="cart-item">
      <img src={imageUrl} alt={name} className="cart-item__image" />

      <div className="cart-item__content">
        <div className="cart-item__top">
          <h3 className="cart-item__name">{name}</h3>
          <p className="cart-item__price">₹{price}</p>
        </div>

        <div className="cart-item__actions">
          <div className="cart-item__quantity" aria-label="Quantity controls">
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={onDecrease}
              aria-label={`Decrease quantity of ${name}`}
            >
              -
            </button>
            <span className="cart-item__qty-value">{quantity}</span>
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={onIncrease}
              aria-label={`Increase quantity of ${name}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={onRemove}
            aria-label={`Remove ${name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
