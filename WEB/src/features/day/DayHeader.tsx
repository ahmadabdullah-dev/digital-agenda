import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router";
import { Shared, } from "../../lib/shared";

export default function DayHeader({ date }: { date: string }) {
  const navigate = useNavigate();
  const goTo = (target: string) => navigate(`/day/${target}`);
  const today = Shared.toISODate(new Date());

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {Shared.formatDate(date)}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Tooltip title="Previous day">
          <IconButton
            aria-label="Previous day"
            onClick={() => goTo(Shared.shiftDate(date, -1))}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>

        <Button
          variant="outlined"
          disabled={date === today}
          onClick={() => goTo(today)}
        >
          Today
        </Button>

        <Tooltip title="Next day">
          <IconButton
            aria-label="Next day"
            onClick={() => goTo( Shared.shiftDate(date, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
