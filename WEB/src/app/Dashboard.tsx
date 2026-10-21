import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";
import GoalsProgress from "../features/goals/GoalsProgress";

export default function Dashboard() {
  return (
    <div>
      <AllDaysTasksCount />
      <AllDaysNotesCount />
      <GoalsProgress/>
    </div>
  );
}
