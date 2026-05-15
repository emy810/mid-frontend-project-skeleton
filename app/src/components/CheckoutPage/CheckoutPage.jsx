import { useAuth } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, cartTotal, checkout } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCheckout() {
    try {
      setLoading(true);
      const order = await checkout(user);
      navigate(`/orders/${order.id}`);
    } catch (err) {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!cartItems.length) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} × {item.quantity} — £{item.price * item.quantity}
            </li>
          ))}
        </ul>

        <h3>Total: £{cartTotal}</h3>
      </div>

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );
}
