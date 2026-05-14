import { createContext, useState, useEffect } from "react";
import api from "../api.js";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

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
  async function checkout(user) {
    const order = {
      userId: user.id,
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(api("/orders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Checkout failed");
    }

    const createdOrder = await response.json();
    clearCart();
    return createdOrder;
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        cartCount,
        cartTotal,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
