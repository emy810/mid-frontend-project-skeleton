import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(api(`/orders?userId=${user.id}`));

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user.id]);

  if (loading) return <p>Loading your orders…</p>;

  if (!orders.length) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <p>
              <strong>Order #{order.id}</strong>
            </p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total: £{order.total}</p>
            <p>Items: {order.items.length}</p>

            <Link to={`/orders/${order.id}`}>View details →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
