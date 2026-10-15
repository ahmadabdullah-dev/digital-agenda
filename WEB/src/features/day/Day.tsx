import { useParams } from "react-router";

export default function Day() {
      const { date } = useParams();

  return (
    <div>Day Date: {date} </div>
  )
}