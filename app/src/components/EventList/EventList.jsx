import { useState } from "react";
import events from "../../data/events.js";
import EventCard from "./EventCard";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList({ sortBy }) {
  const [eventList] = useState(events);
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }
  const sortedEvents = [...events];
  switch (sortBy) {
    case "price":
      sortedEvents.sort((a, b) => a.price - b.price);
      break;
    case "name":
      sortedEvents.sort((a, b) => a.localeCompare - b.localeCompare);
      break;
    case "date":
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    default:
      break;
  }

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
