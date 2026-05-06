import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart"));
    if (saved) setCartItems(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (event) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === event.id);
      if (existing) {
        return prev.map((item) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...event, quantity: 1 }];
    });
  };
  const removeFromCart = (eventId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== eventId));
  };

  const updateQuantity = (eventId, newQty) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((item) => item.id !== eventId);
      }

      return prev.map((item) =>
        item.id === eventId ? { ...item, quantity: newQty } : item,
      );
    });
  };

  const clearCart = () => setCartItems([]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
