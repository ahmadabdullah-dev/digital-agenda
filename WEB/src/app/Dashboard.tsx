import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";

export default function Dashboard() {
  return (
    <div>
      <AllDaysTasksCount />
      <AllDaysNotesCount />
    </div>
  );
}
