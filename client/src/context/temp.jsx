import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (!item) return;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingIndex === -1) {
        return [...prevItems, { ...item, quantity: 1 }];
      }

      return prevItems.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
    });
  };

  const removeFromCart = (itemName, removeAll = false) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.name !== itemName) return item;
          if (removeAll) return null;

          const nextQuantity = (item.quantity || 1) - 1;
          if (nextQuantity <= 0) return null;
          return { ...item, quantity: nextQuantity };
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
