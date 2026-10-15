import { useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
};

export default function MonthlyCalendar() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(dayjs().startOf("month"));

  const start = month.subtract((month.day() + 6) % 7, "day"); // Monday-first
  const days = Array.from({ length: 42 }, (_, i) => start.add(i, "day"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        height: "100dvh",
        mx: "auto",
        p: { xs: 1, sm: 3 },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.25rem", sm: "1.75rem" } }}
        >
          {month.format("MMMM YYYY")}
        </Typography>
        <Box sx={{ display: "flex", border: 1, borderColor: "divider" }}>
          <IconButton
            onClick={() => setMonth(month.subtract(1, "month"))}
            sx={{ borderRadius: 0 }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => setMonth(month.add(1, "month"))}
            sx={{ borderRadius: 0, borderLeft: 1, borderColor: "divider" }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      {/* Weekday names */}
      <Box
        sx={{
          ...grid,
          textAlign: "center",
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
        }}
      >
        {WEEKDAYS.map((d) => (
          <Typography
            key={d}
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {d}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          ...grid,
          flex: 1,
          minHeight: 0,
          gridTemplateRows: "repeat(6, minmax(0, 1fr))",
          gap: "1px",
          bgcolor: "divider",
          border: 1,
          borderColor: "divider",
          borderTop: 0,
        }}
      >
        {days.map((day) => {
          const isToday = day.isSame(dayjs(), "day");
          const inMonth = day.month() === month.month();
          return (
            <Box
              key={day.format("YYYY-MM-DD")}
              onClick={() => navigate(`/day/${day.format("YYYY-MM-DD")}`)}
              sx={{
                p: { xs: 0.5, sm: 1 },
                overflow: "hidden",
                cursor: "pointer",
                userSelect: "none",
                bgcolor: "background.default",
                color: inMonth ? "text.primary" : "text.secondary",
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              <Typography
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: { xs: 22, sm: 28 },
                  height: { xs: 22, sm: 28 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: isToday ? 700 : 400,
                  bgcolor: isToday ? "primary.main" : "transparent",
                  color: isToday ? "primary.contrastText" : "inherit",
                }}
              >
                {day.date()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
