import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import "../styles/pages/Home.css";


const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

function Home() {
  const { cartItems } = useCart();
  return (
    <>
 <NavBar cartCount={cartItems.reduce(
  (total, item) => total + (item.quantity || 1),
  0
)} />
      <main className="home">
        <section className="home__hero">
          <div className="container home__hero-layout">
            <motion.div
              className="home__hero-left"
              variants={slideLeft}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="home__kicker">The Rolling Cones</p>
              <h1 className="home__title">Fresh Sweet &amp; Savory Waffles</h1>
              <p className="home__subtitle">Scan. Order. Enjoy.</p>
              <p className="home__small-text">
                Made fresh with rich flavors and served hot.
              </p>
              <div className="home__actions">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link className="home__button home__button--primary" to="/menu">
                    Order Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link className="home__button home__button--secondary" to="/menu">
                    View Menu
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="home__hero-right"
              variants={slideRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <motion.img
                src="../src/assets/fresh-waffles.webp"
                alt="Fresh waffle assortment"
                className="home__hero-image"
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </section>

        <section className="home__section">
  <div className="container home__section-layout">

    <div className="home__section-image-container">
      <img
        src="../src/assets/sweet-waffles.jpg"
        alt="Sweet waffles"
        className="home__section-image"
      />
    </div>

    <div className="home__section-content">
      <h2 className="home__section-title">
        Sweet Waffles
      </h2>

      <p className="home__section-description">
        Our sweet waffles are made for dessert lovers.
        Rich chocolate, fresh fruits and delicious toppings
        come together to create unforgettable flavors.
      </p>
    </div>

  </div>
</section>


<section className="home__section home__section--savory home__section--reverse">

<div className="container home__section-layout">

<div className="home__section-image-container">

<img
src="../src/assets/savory-waffles.webp"
alt="Savory waffles"
className="home__section-image"
/>

</div>

<div className="home__section-content">

<h2 className="home__section-title">
Savory Waffles
</h2>

<p className="home__section-description">

Our savory waffles combine cheese,
herbs and flavorful ingredients to create
a satisfying snack experience.

</p>

</div>

</div>

</section>


<section className="home__story">

<div className="container">

<div className="home__story-card">

<h2 className="home__story-title">

The Rolling Cones Story

</h2>

<p className="home__story-text">

The Rolling Cones started as a small idea between
food lovers who wanted to bring something unique
and memorable to people. Inspired by street-food
culture and creative flavors, the goal became
simple: serve fresh waffles that make people smile.

</p>

</div>

</div>

</section>

        <footer className="home__footer">
          <div className="container home__footer-content">
            <p className="home__footer-brand">The Rolling Cones</p>
            <nav className="home__footer-links" aria-label="Footer links">
              <Link to="/menu">Menu</Link>
              <Link to="/tracking">Track Order</Link>
              <a href="#contact">Contact</a>
            </nav>
            <div className="home__socials" aria-label="Social links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;