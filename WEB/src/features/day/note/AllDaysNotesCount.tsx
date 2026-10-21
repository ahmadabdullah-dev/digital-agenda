import { Alert, Box, CircularProgress, Paper, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useGetAllDaysNotesCount } from "../../../lib/hooks/useDayNote";

export default function AllDaysNotesCount() {
  const notes = useGetAllDaysNotesCount();

  if (notes.isLoading) return <CircularProgress size={24} />;

  if (notes.isError)
    return <Alert severity="error">Failed to load notes count</Alert>;

  const count = notes.data ?? 0;

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        alignItems: "center",
        gap: 2,
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
        <Typography variant="subtitle2">All Days Notes</Typography>
        <Typography variant="h5">
          {count}
        </Typography>
      </Box>
    </Paper>
  );
}
