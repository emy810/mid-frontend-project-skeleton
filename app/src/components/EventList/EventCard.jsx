import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

export default function EventCard({ event }) {
  const isSoldOut = event.ticketsAvailable === 0;

  return (
    <Card
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        <Chip
          label={event.category}
          color="primary"
          size="small"
          sx={{
            mb: 1,
            textTransform: "uppercase",
            fontSize: "0.75rem",
            alignSelf: "flex-start",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: "1.25rem",
            lineHeight: 1.3,
            minHeight: "auto",
            alignItems: "flex-start",
          }}
        >
          {event.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {event.date} at {event.time}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {event.venue}, {event.city}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, fontSize: "1rem" }}
          >
            {event.price === 0 ? "Free" : `€${event.price}`}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isSoldOut ? "error.main" : "success.main",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            {isSoldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 1.5, pb: 1.5 }}>
        <Button
          component={Link}
          to={`/events/${event.id}`}
          size="small"
          sx={{ fontWeight: 600 }}
          aria-label={`View details for ${event.name}`}
        >
          View details →
        </Button>
      </CardActions>
    </Card>
  );
}
