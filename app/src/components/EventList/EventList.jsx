import { useState, useEffect } from "react";

import EventCard from "./EventCard";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList({ sortBy }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3001/events?q=${searchTerm}`,
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
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />
      {sortedEvents.length === 0 && <p>No matching events.</p>}

      <ul>
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
      <div style={{ marginTop: "1rem" }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>

        <span style={{ margin: "0 1rem" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </>
  );
}
