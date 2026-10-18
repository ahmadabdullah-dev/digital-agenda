import { Alert, Box, CircularProgress, Paper, Typography } from "@mui/material";
import {
  useGetDayTasksCount,
  useGetCompletedDayTasksCount,
} from "../../../lib/hooks/useDayTask";

export default function DayTasksCount() {
  const total = useGetDayTasksCount();
  const completed = useGetCompletedDayTasksCount();

  if (total.isLoading || completed.isLoading)
    return <CircularProgress size={24} />;

  if (total.isError || completed.isError)
    return <Alert severity="error">Failed to load tasks count</Alert>;

  const totalCount = total.data ?? 0;
  const completedCount = completed.data ?? 0;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={5}
          sx={{ color: "action.hover" }}
        />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={5}
          color="success"
          sx={{
            position: "absolute",
            left: 0,
            "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: "600" }}>
            {percent}%
          </Typography>
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2">All Tasks</Typography>
        <Typography variant="body2" color="text.secondary">
          {completedCount} of {totalCount} completed
        </Typography>
      </Box>
    </Paper>
  );
}
