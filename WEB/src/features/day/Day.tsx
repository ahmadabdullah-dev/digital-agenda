import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Shared } from "../../lib/shared";
import {
  useGetCompletedDayTasksCount,
  useGetDayTasksCount,
} from "../../lib/hooks/useDayTask";
import { useGetNotesCount } from "../../lib/hooks/useDayNote";
import DayHeader from "./DayHeader";
import DaySection from "./DaySection";
import AddDayNote from "./note/AddDayNote";
import DayNotes from "./note/DayNotes";
import DayNotesCountCard from "./note/DayNotesCountCard";
import AddDayTask from "./task/AddDayTask";
import DayTasks from "./task/DayTasks";
import DayTasksCountCard from "./task/DayTasksCountCard";

export default function Day() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

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
          <Button
            variant="contained"
            onClick={() => navigate(`/day/${Shared.toISODate(new Date())}`)}
          >
            Open today
          </Button>
        </Box>
      </Container>
    );
  }

  return <DayView date={date} />;
}

function DayView({ date }: { date: string }) {
  const totalTasks = useGetDayTasksCount(date);
  const completedTasks = useGetCompletedDayTasksCount(date);
  const notesCount = useGetNotesCount(date);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={4}>
        <DayHeader date={date} />

        <Box
          key={date}
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "start",
          }}
        >
          <DaySection title="Tasks">
            <DayTasksCountCard
              total={totalTasks.data ?? 0}
              completed={completedTasks.data ?? 0}
            />
            <AddDayTask date={date} />
            <DayTasks date={date} />
          </DaySection>

          <DaySection title="Notes">
            <DayNotesCountCard count={notesCount.data ?? 0} />
            <AddDayNote date={date} />
            <DayNotes date={date} />
          </DaySection>
        </Box>
      </Stack>
    </Container>
  );
}
