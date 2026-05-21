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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
          alignItems: "stretch",
          mb: 4,
        }}
      >
        <TextField
          label="Search events"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2563eb",
              },
              "&:hover fieldset": {
                borderColor: "#1d4ed8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2563eb",
            },
          }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563eb",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d4ed8",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563eb",
              },
            }}
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
