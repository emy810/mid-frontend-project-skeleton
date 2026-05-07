import { useState, useEffect } from "react";
import "./EventList.css";
import EventCard from "./EventCard";

export default function EventList({ sortBy }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  async function loadEvents() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/events?q=${searchTerm}&_page=${page}&_limit=6`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadEvents();
  }, [searchTerm, page]);

  {
    loading && <p>Loading events…</p>;
  }

  if (error) return <p>Error: {error}</p>;

  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }
  const sortedEvents = [...events];
  switch (sortBy) {
    case "price":
      sortedEvents.sort((a, b) => a.price - b.price);
      break;
    case "name":
      sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "date":
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    default:
      break;
  }

  return (
    <>
      {sortedEvents.length === 0 && <p>No matching events.</p>}

      <ul className="events-grid">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </>
  );
}
