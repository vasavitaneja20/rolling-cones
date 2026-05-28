import "../styles/components/OrderCard.css";

// Human-readable mapping for database statuses
const STATUS_LABELS = {
  placed: "Placed",
  in_progress: "In Progress",
  ready: "Ready for Pickup",
  completed: "Completed",
};

function OrderCard({
  orderId,
  items = [],
  totalAmount,
  status,
  onInProgress,
  onReady,
  onCompleted,
}) {
  const normalizedStatus = (status || "").toString().toLowerCase();

  const isPlaced = normalizedStatus === "placed";
  const isInProgress = normalizedStatus === "in_progress";
  const isReady = normalizedStatus === "ready";
  const isCompleted = normalizedStatus === "completed";

  const normalizedItems = (items || []).map((item) => {
    if (typeof item === "string") {
      return { label: item, quantity: 1 };
    }
    const label =
      item?.name ?? item?.itemName ?? item?.title ?? item?.label ?? "Item";
    const quantity = item?.quantity ?? item?.qty ?? 1;

    return { label, quantity };
  });

  return (
    <article
      className={`order-card ${isCompleted ? "order-card--completed" : ""}`}
    >
      <header className="order-card__header">
        <div className="order-card__id">Order #{orderId}</div>

        <span
          className={`
            order-card__status
            ${isPlaced ? "order-card__status--placed" : ""}
            ${isInProgress ? "order-card__status--progress" : ""}
            ${isReady ? "order-card__status--ready" : ""}
            ${isCompleted ? "order-card__status--completed" : ""}
          `}
        >
          {STATUS_LABELS[normalizedStatus] || normalizedStatus || "—"}
        </span>
      </header>

      <section className="order-card__items">
        <h3 className="order-card__section-title">Items</h3>

        {normalizedItems.length === 0 ? (
          <p className="order-card__muted">No items.</p>
        ) : (
          <ul className="order-card__list">
            {normalizedItems.map((item, idx) => (
              <li
                className="order-card__list-item"
                key={`${item.label}-${idx}`}
              >
                <span className="order-card__item-name">{item.label}</span>
                <span className="order-card__item-qty">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="order-card__footer">
        <div className="order-card__total">
          <span>Total Amount</span>
          <strong>₹{totalAmount ?? 0}</strong>
        </div>

        <div className="order-card__actions">
          {isCompleted ? (
            // Clean view state when order is finished instead of multiple disabled buttons
            <span className="order-card__completed-badge">
              ✓ Order Fulfilled
            </span>
          ) : (
            <>
              <button
                type="button"
                className={`order-card__btn ${isInProgress ? "order-card__btn--active" : ""}`}
                onClick={onInProgress}
                // Only clickable if it is currently placed
                disabled={!isPlaced}
              >
                In Progress
              </button>

              <button
                type="button"
                className={`order-card__btn ${isReady ? "order-card__btn--active" : ""}`}
                onClick={onReady}
                // Only clickable if order is actively being prepared
                disabled={!isInProgress}
              >
                Ready
              </button>

              <button
                type="button"
                className={`order-card__btn order-card__btn--complete-action`}
                onClick={onCompleted}
                // Only clickable once the item is marked ready
                disabled={!isReady}
              >
                Complete Order
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
}

export default OrderCard;
