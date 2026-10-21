import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";
import GoalsDashboard from "../features/goals/GoalsDashboard";

export default function Dashboard() {
  return (
    <div>
      <AllDaysTasksCount />
      <AllDaysNotesCount />
      <GoalsDashboard/>
    </div>
  );
}
