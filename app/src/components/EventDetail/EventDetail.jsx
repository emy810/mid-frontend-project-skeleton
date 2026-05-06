import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadEvent() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3001/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadEvent();
  }, [id]);

  if (loading) return <p>Loading event…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found.</p>;
  const isSoldOut = event.ticketsAvailable === 0;
  return (
    <div className="event-detail-container">
      <h2 className="event-detail-title">{event.name}</h2>
      <div className="event-detail-meta">
        <span>Date: {event.date}</span>
        <span>Time: {event.time}</span>
        <span>Venue: {event.venue}</span>
        <span>City: {event.city}</span>
        <span>Category: {event.category}</span>
        <p>Price: {event.price}</p>

        <span
          className={`event-detail-status ${
            isSoldOut ? "sold-out" : "tickets-left"
          }`}
        >
          {isSoldOut
            ? "Sold out"
            : `${event.ticketsAvailable} ticket ${event.ticketsAvailable === 1 ? "" : "s"} left`}
        </span>
      </div>
      <p className="event-detail-description">{event.description}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(event)}
        disabled={event.ticketsAvailable === 0}
      >
        {event.ticketsAvailable === 0 ? "Sold out" : "Add to cart"}
      </button>
      <Link to="/" className="event-detail-back">
        ← Back to events
      </Link>
    </div>
  );
}
