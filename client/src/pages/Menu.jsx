import { useMemo, useState, useEffect } from "react";
import { getMenuItems } from "../api/menuApi";
import FoodCard from "../components/FoodCard";
import Navbar from "../components/NavBar";
import "../styles/pages/Menu.css";
import { useCart } from "../context/CartContext";

function Menu() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuItems();

        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const categorizedItems = useMemo(() => {
    const sweet = [];
    const savory = [];

    menuItems.forEach((item) => {
      const normalizedCategory = item.category?.trim().toLowerCase();

      if (normalizedCategory === "sweet") sweet.push(item);

      if (normalizedCategory === "savory") savory.push(item);
    });

    return { sweet, savory };
  }, [menuItems]);

  const showSweet = activeFilter === "all" || activeFilter === "sweet";
  const showSavory = activeFilter === "all" || activeFilter === "savory";

  const renderCards = (items) =>
    items.map((item) => (
      <FoodCard
        key={`${item.name}-${item.category}`}
        name={item.name}
        category={item.category}
        description={item.description}
        price={item.price}
        imageUrl={item.imageUrl}
        available={item.available}
        onAddToCart={() => addToCart(item)}
      />
    ));

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <main className="menu-page container">
        <header className="menu-page__header">
          <h1 className="menu-page__title">Our Waffle Menu</h1>
          <p className="menu-page__subtitle">
            Explore sweet cravings and savory delights, made fresh for every
            order.
          </p>
        </header>

        <div className="menu-page__filters" aria-label="Filter menu items">
          <button
            type="button"
            className={`menu-page__filter ${activeFilter === "all" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`menu-page__filter ${activeFilter === "sweet" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("sweet")}
          >
            Sweet
          </button>
          <button
            type="button"
            className={`menu-page__filter ${activeFilter === "savory" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("savory")}
          >
            Savory
          </button>
        </div>

        <div className="menu-page__sections">
          {showSweet && (
            <section className="menu-page__section">
              <h2 className="menu-page__section-title">Sweet Waffles</h2>
              <div className="menu-page__grid">
                {renderCards(categorizedItems.sweet)}
              </div>
            </section>
          )}

          {showSavory && (
            <section className="menu-page__section">
              <h2 className="menu-page__section-title menu-page__section-title--savory">
                Savory Waffles
              </h2>
              <div className="menu-page__grid">
                {renderCards(categorizedItems.savory)}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Menu;
