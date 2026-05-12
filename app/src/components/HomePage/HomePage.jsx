// Feel free to replace the content of this component with your own
import { useState } from "react";

import EventList from "../EventList/EventList.jsx";
import "./HomePage.css";
export default function HomePage() {
  const [sortBy, setSortBy] = useState("date");
  const [search, setSearch] = useState("");
  return (
    <div className="home-container">
      <h1 className="page-title">Upcoming Events</h1>
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <EventList sortBy={sortBy} search={search} />
    </div>
  );
}
