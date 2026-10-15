import { Container, Stack, Typography, Divider } from "@mui/material";
import { useParams } from "react-router";
import AddDayNote from "./AddDayNote";
import DayNotes from "./DayNotes";
import { Shared } from "../../lib/shared";

export default function Day() {
  const { date } = useParams<{ date: string }>();

  if (!date) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography color="text.secondary">No date provided</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "600" }} variant="h4" component="h1">
            {Shared.formatDate(date)}
          </Typography>
          <Divider />
        </Stack>

        <Stack spacing={3} sx={{ display: "flex", alignItems: "center" }}>
          <AddDayNote key={date} date={date} />
          <DayNotes key={date} date={date} />
        </Stack>
      </Stack>
    </Container>
  );
}
