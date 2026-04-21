// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data
import { useState } from "react";
import { useParams } from "react-router-dom";
import events from "../../data/events";
export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  if (!event) {
    return <p>Event not found</p>;
  }
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
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>{quantity}</span>

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
