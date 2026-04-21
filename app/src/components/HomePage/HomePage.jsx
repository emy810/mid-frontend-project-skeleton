// Feel free to replace the content of this component with your own

import events from "../../data/events";
import EventList from "../EventList/EventList";

export default function HomePage() {
  return <EventList events={events} />;
}
