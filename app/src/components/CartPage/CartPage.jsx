import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./CartPage.css";

export default function CartPage() {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useContext(CartContext);
  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p className="price">Price £{item.price} </p>
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
        <button disabled={!user} className="checkout-btn">
          {user ? "Proceed to Checkout" : "Login to Checkout"}
        </button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
