import { Stack } from "@mui/material";

import GoalsList from "./GoalsList";
import GoalsProgress from "./GoalsProgress";
import AddGoal from "./AddGoal";

export default function GoalsDashboard() {
  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <GoalsProgress />
      <GoalsList />
      <AddGoal/>
    </Stack>
  );
}
