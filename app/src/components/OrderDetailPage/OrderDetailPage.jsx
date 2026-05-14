import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(api(`/orders/${id}`));
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Failed to load order", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order…</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="order-detail-page">
      <h1>Order #{order.id}</h1>

      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Total: £{order.total}</p>

      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity} — £{item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
