import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import {
  useGetCurrentUserCompletedGoalsCount,
  useGetCurrentUserGoalsCount,
} from "../../lib/hooks/useGoal";

type StatProps = {
  label: string;
  value: number;
  color?: string;
};

function Stat({ label, value, color = "text.primary" }: StatProps) {
  return (
    <Box sx={{ flex: 1, textAlign: "center", minWidth: 0, px: 1 }}>
      <Typography
        sx={{
          color,
          fontWeight: 700,
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          lineHeight: 1.2,
          mb: 0.5,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block" }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function GoalsProgress() {
  const completed = useGetCurrentUserCompletedGoalsCount();
  const total = useGetCurrentUserGoalsCount();

  if (completed.isPending || total.isPending) {
    return <Skeleton variant="rounded" sx={{ height: 180, borderRadius: 2 }} />;
  }

  if (completed.isError || total.isError) {
    return <Alert severity="error">Could not load goals progress.</Alert>;
  }

  const completedCount = completed.data;
  const totalCount = total.data;
  const remaining = Math.max(totalCount - completedCount, 0);
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const isAllDone = totalCount > 0 && completedCount === totalCount;

  return (
    <Paper
      variant="outlined"
      sx={{
        p:2,
        m:2,
        borderRadius: 2,
        borderLeft: "4px solid",
        borderLeftColor: isAllDone ? "success.main" : "primary.main",
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: 2.5, sm: 4 },
        }}
      >
        {/* Progress ring */}
        <Box
          sx={{ position: "relative", display: "inline-flex", flexShrink: 0 }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={96}
            thickness={4}
            sx={{ color: "action.hover" }}
          />
          <CircularProgress
            variant="determinate"
            value={percent}
            size={96}
            thickness={4}
            color={isAllDone ? "success" : "primary"}
            sx={{ position: "absolute", left: 0, top: 0 }}
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
            <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
              {percent}%
            </Typography>
          </Box>
        </Box>

        {/* Text + stats */}
        <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
          <Box sx={{ mb: 2.5, textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.125rem" },
                lineHeight: 1.3,
                mb: 0.5,
              }}
            >
              {totalCount === 0
                ? "No goals yet"
                : isAllDone
                  ? "All goals completed 🎉"
                  : "Your progress"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {totalCount === 0
                ? "Add a goal to start tracking."
                : `${completedCount} of ${totalCount} goals completed`}
            </Typography>
          </Box>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{
              bgcolor: "action.hover",
              borderRadius: 2,
              px: { xs: 1, sm: 2 },
              py: 2,
            }}
          >
            <Stat
              label="Completed"
              value={completedCount}
              color="success.main"
            />
            <Stat label="Remaining" value={remaining} color="primary.main" />
            <Stat label="Total" value={totalCount} />
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
