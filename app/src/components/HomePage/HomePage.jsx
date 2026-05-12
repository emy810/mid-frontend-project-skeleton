import { useState } from "react";

import EventList from "../EventList/EventList.jsx";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function HomePage() {
  const [sortBy, setSortBy] = useState("date");
  const [search, setSearch] = useState("");
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Upcoming Events
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <TextField
          label="Search events"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <EventList sortBy={sortBy} search={search} />
    </Container>
  );
}
