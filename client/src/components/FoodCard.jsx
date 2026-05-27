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
  const safeCategory = (category || "").toLowerCase();
  const isAvailable = Boolean(available);

  return (
    <article className="food-card">
      <img src={imageUrl} alt={name} className="food-card__image" />

      <div className="food-card__content">
        <div className="food-card__top-row">
          <h3 className="food-card__name">{name}</h3>
          <span className={`food-card__badge food-card__badge--${safeCategory}`}>
            {safeCategory}
          </span>
        </div>

        <p className="food-card__description">{description}</p>
        <p className="food-card__price">₹{price}</p>

        <button
          type="button"
          className="food-card__button"
          disabled={!isAvailable}
          onClick={isAvailable ? onAddToCart : undefined}
        >
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}

export default FoodCard;
