import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import { Link } from "react-router-dom";
import "./OrdersPage.css";
import { FaCalendarAlt, FaPoundSign, FaListUl } from "react-icons/fa";
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

      <div className="orders-grid">
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You have no orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>
                <strong>Order #{order.id}</strong>
              </p>

              <p>
                <FaCalendarAlt size={14} /> Date:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p>
                <FaPoundSign size={14} /> Total: £{order.total}
              </p>

              <p>
                <FaListUl size={14} /> Items: {order.items.length}
              </p>

              <Link to={`/orders/${order.id}`} className="view-btn">
                View Order
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
