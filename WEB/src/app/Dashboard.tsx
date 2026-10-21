import AllDaysNotesCount from "../features/day/note/AllDaysNotesCount";
import AllDaysTasksCount from "../features/day/task/AllDaysTasksCount";
import GoalsProgress from "../features/goals/GoalsProgress";
import FastDaySearch from "./components/FastDaySearch";

export default function Dashboard() {
  return (
    <div>
      <FastDaySearch/>
      <AllDaysTasksCount />
      <AllDaysNotesCount />
      <GoalsProgress/>
    </div>
  );
}
