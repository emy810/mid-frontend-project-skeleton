import { Link } from "react-router-dom";
import "./EventCard.css";
export default function EventCard({ event }) {
  return (
    <li className="event-card">
      <div className="event-content">
        <p className="event-category">{event.category}</p>
        <h2 className="event-title">{event.name}</h2>
        <p className="event-meta">
          {event.date} at {event.time}
        </p>
        <p className="event-meta">
          {event.venue}, {event.city}
        </p>
      </div>
      <div className="event-footer">
        <div className="event-price-status">
          <span className="event-price">
            {event.price === 0 ? "Free" : `€${event.price}`}
          </span>
          <span
            className={
              event.ticketsAvailable === 0
                ? "sold-out"
                : event.ticketsAvailable
                  ? "tickets-left"
                  : "no-status"
            }
          >
            {event.ticketsAvailable === 0
              ? "Sold out"
              : event.ticketsAvailable
                ? `${event.ticketsAvailable} tickets left`
                : ""}
          </span>
        </div>
        <Link to={`/events/${event.id}`} className="details-link">
          View details →
        </Link>
      </div>
    </li>
  );
}
