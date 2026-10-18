import { Box, Paper, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

type Props = {
  count: number;
};

export default function DayNotesCountCard({ count }: Props) {
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
      <Box
        sx={{
          width: 56,
          height: 56,
          flexShrink: 0,
          borderRadius: "50%",
          bgcolor: "action.hover",
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NoteAltIcon />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2">Today's Notes Count</Typography>
        <Typography variant="h5">{count}</Typography>
      </Box>
    </Paper>
  );
}
