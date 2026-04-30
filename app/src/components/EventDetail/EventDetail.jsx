import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
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

    loadEvent();
  }, [id]);

  if (loading) return <p>Loading event…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found.</p>;

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
            event.tickets === 0
              ? "sold-out"
              : event.tickets > 0
                ? "tickets-left"
                : "no-status"
          }`}
        >
          {event.ticketsAvailable === 0
            ? "Sold out"
            : `${event.ticketsAvailable} tickets left`}
        </span>
      </div>
      <p className="event-detail-description">{event.description}</p>
      <Link to="/" className="event-detail-back">
        ← Back to events
      </Link>
    </div>
  );
}
