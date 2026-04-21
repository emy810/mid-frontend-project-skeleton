import events from "../../data/events.js";
import EventCard from "./EventCard";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList({ event }) {
  return (
    <ul>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
