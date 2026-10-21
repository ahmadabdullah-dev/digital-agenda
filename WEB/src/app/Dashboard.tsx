import { Box, Container, Stack } from "@mui/material";

import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";
import GoalsProgress from "../features/goals/GoalsProgress";
import FastDaySearch from "./components/FastDaySearch";

export default function Dashboard() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={{ xs: 2, sm: 3 }}>
        <FastDaySearch />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, sm: 3 },
          }}
        >
          <AllDaysTasksCount />
          <AllDaysNotesCount />
        </Box>

        <GoalsProgress />
      </Stack>
    </Container>
  );
}
