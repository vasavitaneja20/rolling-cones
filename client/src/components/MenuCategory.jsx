import FoodCard from "./FoodCard";
import "../styles/components/MenuCategory.css";

function MenuCategory({ title, items = [] }) {
  return (
    <section className="menu-category">
      <h2 className="menu-category__title">{title}</h2>

      <div className="menu-category__grid">
        {items.map((item) => (
          <FoodCard
            key={item.name}
            name={item.name}
            category={item.category}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            available={item.available}
            onAddToCart={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

export default MenuCategory;
