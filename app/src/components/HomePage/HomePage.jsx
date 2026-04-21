// Feel free to replace the content of this component with your own
import { useState } from "react";
import events from "../../data/events.js";
import EventList from "../EventList/EventList.jsx";

export default function HomePage() {
  const [sortBy, setSortBy] = useState("date");
  return (
    <div>
      <h1>Upcoming Events</h1>

      <label>
        Sort by:{" "}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </label>
      <EventList events={events} sortBy={sortBy} />
    </div>
  );
}
console.log("EVENTLIST:", EventList);
