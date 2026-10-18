import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import AddDayNote from "./note/AddDayNote";
import DayNotes from "./note/DayNotes";
import { Shared } from "../../lib/shared";
import DayTasks from "./task/DayTasks";
import AddDayTask from "./task/AddDayTask";
import DayTasksCountCard from "./task/DayTasksCountCard";
import {
  useGetCompletedDayTasksCount,
  useGetDayTasksCount,
} from "../../lib/hooks/useDayTask";
import DayNotesCountCard from "./note/DayNotesCountCard";
import { useGetNotesCount } from "../../lib/hooks/useDayNote";

function toISODate(d: Date) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function shiftDate(date: string, days: number) {
  const [y, m, d] = date.split("-").map(Number);
  return toISODate(new Date(y, m - 1, d + days));
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Paper
      variant="outlined"
      component="section"
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: "100%" }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
}

export default function Day() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

  const goTo = (target: string) => navigate(`/day/${target}`);
  const goToToday = () => goTo(toISODate(new Date()));

  const totalTaskCount = useGetDayTasksCount(date!);
  const completedTaskCount = useGetCompletedDayTasksCount(date!);
  const notesCount = useGetNotesCount(date!);


  if (!date) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "action.hover",
            border: 1,
            borderColor: "divider",
            borderStyle: "dashed",
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
            No date provided
          </Typography>
          <Button variant="contained" onClick={goToToday}>
            Open today
          </Button>
        </Box>
      </Container>
    );
  }

  const isToday = date === toISODate(new Date());

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {Shared.formatDate(date)}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Tooltip title="Previous day">
              <IconButton
                aria-label="Previous day"
                onClick={() => goTo(shiftDate(date, -1))}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
            <Button variant="outlined" disabled={isToday} onClick={goToToday}>
              Today
            </Button>
            <Tooltip title="Next day">
              <IconButton
                aria-label="Next day"
                onClick={() => goTo(shiftDate(date, 1))}
              >
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Box
          key={date}
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "start",
          }}
        >
          <Section title="Tasks">
            <DayTasksCountCard
              total={totalTaskCount.data ?? 0}
              completed={completedTaskCount.data ?? 0}
            />
            <AddDayTask date={date} />
            <DayTasks date={date} />
          </Section>

          <Section title="Notes">
            <DayNotesCountCard count={notesCount.data ?? 0} />
            <AddDayNote date={date} />
            <DayNotes date={date} />
          </Section>
        </Box>
      </Stack>
    </Container>
  );
}
