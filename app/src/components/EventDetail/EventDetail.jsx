// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data

export default function EventDetail() {
  return (
    <div>
      <h2>React Copenhagen Conference 2026</h2>
      <p>Date: 2026-04-15</p>
      <p>Time: 09:00</p>
      <p>Venue: Copenhagen Concert Hall</p>
      <p>City: Copenhagen</p>
      <p>Category: Conference</p>
      <p>Price: €149</p>
      <p>Tickets: Sold out</p>
      <p>Description: The largest React conference in Scandinavia. Two tracks covering the latest in React 19, Server Components, and the evolving frontend ecosystem. Keynotes from core React team members and community leaders.</p>
    </div>
  );
}