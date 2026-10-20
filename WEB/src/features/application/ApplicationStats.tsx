import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { useApplicationStats } from "../../lib/hooks/useApplication";

type PaletteKey = "info" | "warning" | "success" | "error" | "grey";

const statusPalette = (status: string): PaletteKey => {
  switch (status.toLowerCase()) {
    case "applied":
      return "info";
    case "underreview":
    case "interview":
      return "warning";
    case "accepted":
      return "success";
    case "rejected":
      return "error";
    default:
      return "grey";
  }
};

const resolveColor = (theme: Theme, key: PaletteKey) =>
  key === "grey" ? theme.palette.grey[500] : theme.palette[key].main;

// "UnderReview" -> "Under review"
const prettify = (s: string) =>
  s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/(\s)([A-Z])/g, (_, sp, c) => sp + c.toLowerCase());

// Responsive grid that adapts to available width without breakpoints
const gridSx = {
  display: "grid",
  gap: { xs: 1.5, sm: 2, md: 3 },
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(auto-fill, minmax(300px, 1fr))",
  },
} as const;

function StatCard({
  type,
  statusCounts,
}: {
  type: string;
  statusCounts: Record<string, number>;
}) {
  const theme = useTheme();
  const entries = Object.entries(statusCounts);
  const total = entries.reduce((sum, [, n]) => sum + n, 0);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "border-color .2s, box-shadow .2s",
        "&:hover": {
          borderColor: "text.disabled",
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 2,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ fontWeight: 600, minWidth: 0 }}
            title={type}
          >
            {type}
          </Typography>
          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: "1.75rem", sm: "2rem" },
                fontWeight: 700,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              total
            </Typography>
          </Box>
        </Stack>

        {/* Distribution bar */}
        <Box
          role="img"
          aria-label={`${type} status distribution`}
          sx={{
            display: "flex",
            height: 8,
            borderRadius: 4,
            overflow: "hidden",
            gap: "2px",
            bgcolor: "action.hover",
            mb: 2.5,
          }}
        >
          {entries
            .filter(([, n]) => n > 0)
            .map(([status, n]) => (
              <Tooltip key={status} title={`${prettify(status)}: ${n}`} arrow>
                <Box
                  sx={{
                    flexGrow: n,
                    flexBasis: 0,
                    bgcolor: resolveColor(theme, statusPalette(status)),
                  }}
                />
              </Tooltip>
            ))}
        </Box>

        {/* Rows */}
        <Stack spacing={0.5}>
          {entries.map(([status, count]) => {
            const color = resolveColor(theme, statusPalette(status));
            const pct = total ? Math.round((count / total) * 100) : 0;
            return (
              <Box
                key={status}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto",
                  alignItems: "center",
                  columnGap: 1.25,
                  px: 1,
                  py: 0.75,
                  mx: -1,
                  borderRadius: 1.5,
                  opacity: count === 0 ? 0.5 : 1,
                  "&:hover": { bgcolor: alpha(color, 0.08) },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: color,
                  }}
                />
                <Typography variant="body2" noWrap>
                  {prettify(status)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {pct}%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    minWidth: 28,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {count}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ApplicationStats() {
  const { data: stats, isPending, isError, error } = useApplicationStats();

  if (isPending) {
    return (
      <Box sx={gridSx}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={230}
            sx={{ borderRadius: 3 }}
          />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
        {(error as Error).message}
      </Alert>
    );
  }

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          No application stats yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stats will show up here once you add your first application.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={gridSx}>
      {Object.entries(stats).map(([type, statusCounts]) => (
        <StatCard
          key={type}
          type={type}
          statusCounts={statusCounts as Record<string, number>}
        />
      ))}
    </Box>
  );
}
