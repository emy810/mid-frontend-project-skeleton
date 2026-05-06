import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function cartPage() {
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
          <h3>{item.name}</h3>
          <p>Price: {item.price} DKK</p>

          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: {cartTotal} £</h2>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
