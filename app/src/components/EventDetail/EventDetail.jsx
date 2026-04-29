// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div>
      <h2>{event.name}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Venue: {event.venue}</p>
      <p>City: {event.city}</p>
      <p>Category: {event.category}</p>
      <p>Price: {event.price}</p>

      <p>
        {event.ticketsAvailable === 0
          ? "Sold out"
          : `${event.ticketsAvailable} tickets left`}
      </p>
      <p>{event.description}</p>
      {event.ticketsAvailable > 0 && (
        <div className="quantity-container">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
          >
            -
          </button>

          <span className="quantity-value">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= event.ticketsAvailable}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
