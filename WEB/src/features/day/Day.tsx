import { Typography } from "@mui/material";
import { useParams } from "react-router";
import AddDayNote from "./AddDayNote";

export default function Day() {
  const { date } = useParams<{ date: string }>();

  if (!date) return <Typography>No date provided</Typography>;

  return (
    <div>
      <Typography>Day Date: {date}</Typography>
      <AddDayNote key={date} date={date} />
    </div>
  );
}
