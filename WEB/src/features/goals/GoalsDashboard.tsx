import { Stack } from "@mui/material";

import GoalsList from "./GoalsList";
import GoalsProgress from "./GoalsProgress";

export default function GoalsDashboard() {
  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <GoalsProgress />
      <GoalsList />
    </Stack>
  );
}
