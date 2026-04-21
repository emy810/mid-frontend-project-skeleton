import EventCard from "./EventCard";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList({ events, sortBy }) {
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    return 0;
  });
  return (
    <ul>
      {sortedEvents.length === 0 ? (
        <p>No matching events.</p>
      ) : (
        sortedEvents.map((event) => <EventCard key={event.id} event={event} />)
      )}
    </ul>
  );
}
