import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import "./OrderDetailPage.css";
import { FaCalendarAlt, FaPoundSign, FaListUl } from "react-icons/fa";

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
    <div className="order-details-page">
      <div className="order-details-card">
        <h1>Order #{order.id}</h1>

        <div className="order-meta">
          <p>
            {" "}
            <FaCalendarAlt size={14} />
            Date: {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            {" "}
            <FaPoundSign size={14} />
            Total: £{order.total}
          </p>
        </div>

        <div className="order-items">
          <h2>Items</h2>
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <FaListUl size={14} />
              {item.name} × {item.quantity} — £{item.price * item.quantity}
            </div>
          ))}
        </div>

        <div className="order-total">Total: £{order.total}</div>

        <Link to="/orders" className="back-btn">
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
}
