import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";
import GoalsList from "../features/goals/GoalsList";

export default function Dashboard() {
  return (
    <div>
      <AllDaysTasksCount />
      <AllDaysNotesCount />
      <GoalsList/>
    </div>
  );
}
