import { Container, Stack, Typography, Divider, Box } from "@mui/material";
import { useParams } from "react-router";
import AddDayNote from "./note/AddDayNote";
import DayNotes from "./note/DayNotes";
import { Shared } from "../../lib/shared";

export default function Day() {
  const { date } = useParams<{ date: string }>();

  if (!date) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "action.hover",
            border: 1,
            borderColor: "divider",
            borderStyle: "dashed",
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: "500" }}>
            No date provided
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {Shared.formatDate(date)}
          </Typography>
          <Divider />
        </Stack>

        <Stack spacing={3}>
          <AddDayNote key={date} date={date} />
          <DayNotes key={date} date={date} />
        </Stack>
      </Stack>
    </Container>
  );
}
