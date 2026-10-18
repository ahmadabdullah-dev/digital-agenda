import { Box, CircularProgress, Paper, Typography } from "@mui/material";

type Props = {
  total: number;
  completed: number;
  title?: string;
};

export default function DayTasksCountCard({ total, completed }: Props) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

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
        {/* grey track */}
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
          <Typography variant="caption">{percent}%</Typography>
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2">Today's Tasks</Typography>
        <Typography variant="body2" color="text.secondary">
          {completed} of {total} completed
        </Typography>
      </Box>
    </Paper>
  );
}
