import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const { user } = useAuth();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    isLoaded,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  console.log("Loaded:", isLoaded, cartItems);
  if (!isLoaded) {
    return <p>Loading cart...</p>;
  }
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/events" className="empty-cart-back">
          ← Back to events
        </Link>
      </div>
    );
  }
  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  const isCheckoutDisabled = cartItems.length === 0 || isLoading;
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p className="price">Price: £{item.price} </p>
          </div>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="cart-total">Total: £{cartTotal} </h2>

      {!user && (
        <p className="checkout-warning">
          You must be logged in to proceed to checkout.
        </p>
      )}
      <div className="cart-actions">
        <button
          disabled={isCheckoutDisabled}
          className="checkout-btn"
          onClick={handleCheckout}
        >
          {isLoading
            ? "Processing..."
            : user
              ? "Proceed to Checkout"
              : "Login to Checkout"}
        </button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
