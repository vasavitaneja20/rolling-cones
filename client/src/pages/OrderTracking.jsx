import NavBar from "../components/NavBar";
import "../styles/pages/OrderTracking.css";

const orderSteps = [
  "Placed",
  "Preparing",
  "Ready for Pickup",
  "Completed",
];

function OrderTracking() {
  const orderNumber = "TRC-2026-1084";
  const currentStepIndex = 1;

  return (
    <>
      <NavBar cartCount={0} />

      <main className="tracking-page container">

        <div className="tracking-page__wrapper">

          <header className="tracking-page__header">

            <h1>Track Your Order</h1>

            <p>
              Order Number:
              <strong> {orderNumber}</strong>
            </p>

          </header>


          <div className="tracking-page__info">

            <div className="tracking-page__status-card">

              <h2>Current Status</h2>

              <h3>Preparing 🍽️</h3>

              <p>
                We are preparing your delicious order.
              </p>

              <div className="tracking-page__time">

                Approx Wait Time:
                <strong> 10 mins</strong>

              </div>

            </div>

            <div className="tracking-page__image-container">

              <img
                src="../src/assets/order-tracking.png"
                alt="Order tracking"
                className="tracking-page__image"
              />

            </div>

          </div>


          <section className="tracking-page__timeline-card">

            <h2>Order Progress</h2>

            <ol className="tracking-page__timeline">

              {orderSteps.map((step, index) => {

                const state =
                  index < currentStepIndex
                    ? "completed"
                    : index === currentStepIndex
                    ? "active"
                    : "upcoming";

                return (
                  <li
                    key={step}
                    className={`tracking-page__step tracking-page__step--${state}`}
                  >

                    <span
                      className="tracking-page__dot"
                    />

                    <div className="tracking-page__step-content">

                      <h3>{step}</h3>

                      <p>

                        {state==="completed" &&
                          "Completed successfully"}

                        {state==="active" &&
                          "Currently being processed"}

                        {state==="upcoming" &&
                          "Waiting for next stage"}

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