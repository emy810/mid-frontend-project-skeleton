import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Grid, Box, Button, Typography, CircularProgress } from "@mui/material";

export default function EventList({ sortBy, search }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  async function loadEvents() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events?q=${search}&_page=${page}&_limit=6`,
      );

      if (!response.ok) throw new Error("Failed to fetch events");

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
  }, [search, page]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading events…</Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );

  if (!events || events.length === 0)
    return <Typography>No events available.</Typography>;

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
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={3}
          rowSpacing={2}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {sortedEvents.map((event) => (
            <Grid xs={12} sm={6} md={4} lg={4} key={event.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <EventCard event={event} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <Typography>Page {page}</Typography>

        <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </Box>
    </>
  );
}
