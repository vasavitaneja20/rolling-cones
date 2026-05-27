import "../styles/components/OrderCard.css";

function OrderCard({
  orderId,
  items = [],
  totalAmount,
  status,
  onInProgress,
  onReady,
}) {
  const normalizedStatus = (status || "").toString();
  const isInProgress = normalizedStatus.toLowerCase() === "in progress";
  const isReady = normalizedStatus.toLowerCase() === "ready";

  const normalizedItems = (items || []).map((item) => {
    if (typeof item === "string") return { label: item, quantity: 1 };

    const label =
      item?.name ?? item?.itemName ?? item?.title ?? item?.label ?? "Item";
    const quantity = item?.quantity ?? item?.qty ?? 1;

    return { label, quantity };
  });

  return (
    <article className="order-card">
      <header className="order-card__header">
        <div className="order-card__id">Order #{orderId}</div>

        <span
          className={`order-card__status ${
            isReady ? "order-card__status--ready" : ""
          } ${isInProgress ? "order-card__status--progress" : ""}`}
        >
          {normalizedStatus || "—"}
        </span>
      </header>

      <section className="order-card__items">
        <h3 className="order-card__section-title">Items</h3>
        {normalizedItems.length === 0 ? (
          <p className="order-card__muted">No items.</p>
        ) : (
          <ul className="order-card__list">
            {normalizedItems.map((item, idx) => (
              <li className="order-card__list-item" key={`${item.label}-${idx}`}>
                <span className="order-card__item-name">{item.label}</span>
                <span className="order-card__item-qty">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="order-card__footer">
        <div className="order-card__total">
          <span>Total</span>
          <strong>₹{totalAmount ?? 0}</strong>
        </div>

        <div className="order-card__actions">
          <button
            type="button"
            className={`order-card__btn ${
              isInProgress ? "order-card__btn--active" : ""
            }`}
            onClick={onInProgress}
            disabled={isInProgress}
          >
            In Progress
          </button>
          <button
            type="button"
            className={`order-card__btn ${isReady ? "order-card__btn--active" : ""}`}
            onClick={onReady}
            disabled={isReady}
          >
            Ready
          </button>
        </div>
      </footer>
    </article>
  );
}

export default OrderCard;
