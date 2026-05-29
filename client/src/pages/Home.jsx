import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import heroWaffles from "../assets/hero-waffles.jpg";
import sweetWaffles from "../assets/sweet-waffles.jpg";
import savoryWaffles from "../assets/savory-waffles.jpg";
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
              <h1 className="home__title">Fresh Sweet &amp; Savory Waffles</h1>
              <p className="home__subtitle">Scan. Order. Enjoy.</p>
              <p className="home__small-text">
              At The Rolling Cones, we strive to deliver experiences, not just waffles. Our waffles are inspired and carefully curated with crispy textures, warm fillings, and unforgettable flavors in every bite. From indulgent sweet treats to bold savory bites, The Rolling Cones is committed to giving you one hell of a waffle experience.</p>
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
                src={heroWaffles}
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
        src={sweetWaffles}
        alt="Sweet waffles"
        className="home__section-image"
      />
    </div>

    <div className="home__section-content">
      <h2 className="home__section-title">
        Sweet Waffles
      </h2>

      <p className="home__section-description">
      Our sweet waffles come with delectable toppings - from creamy delights to fruity flavors, every waffle is prepared fresh to deliver the perfect balance of sweetness and texture. We remain committed to serving comfort and warmth through our signature waffles right from the very first bite.</p>
    </div>

  </div>
</section>


<section className="home__section home__section--savory home__section--reverse">

<div className="container home__section-layout">

<div className="home__section-image-container">

<img
src={savoryWaffles}
alt="Savory waffles"
className="home__section-image"
/>

</div>

<div className="home__section-content">

<h2 className="home__section-title">
Savory Waffles
</h2>

<p className="home__section-description">

The Rolling Cones started with the idea of bringing the concept of savory waffles from Belgium to the click of a button. Our unique flavors and bold ingredients combine to create the perfect crispy experience we intended to craft for you. Our savory range is designed for those who want something filling, flavorful, and different from the ordinary.
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

The Rolling Cones began with a simple idea - curating an experience for everyone with a waffle craving. We serve a variety of sweet and savory waffles to expand the horizons of waffle dishes and introduce something truly memorable. What started as a small concept between food enthusiasts slowly grew into a place where people come together over good food, quick conversations, and waffles made with care. Our commitment to delivering a quality experience is what gave birth to The Rolling Cones.
</p>

</div>

</div>

</section>

        <footer className="home__footer">
          <div className="container home__footer-content">
            <p className="home__footer-brand">© 2026 The Rolling Cones. All rights reserved.</p>
            <nav className="home__footer-links" aria-label="Footer links">
              <Link to="/menu">Menu</Link>
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