import { useState } from "react";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import type { PaginationParams } from "../../../lib/types/common";
import type { DayNoteDto } from "../../../lib/types/dayNote";
import {
  useDeleteDayNote,
  useGetAllCurrentUserDayNotes,
} from "../../../lib/hooks/useDayNote";
import UpdateDayNoteDialog from "./UpdateDayNoteDialog";

type Props = {
  date: string;
};

const cardSize = { xs: 12, sm: 6, lg: 4 };

export default function DayNotes({ date }: Props) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });
  const [editingNote, setEditingNote] = useState<DayNoteDto | null>(null);

  const { data, isPending, isError, error } = useGetAllCurrentUserDayNotes(
    pagination,
    date,
  );
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteDayNote();

  if (isPending) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={cardSize}>
            <Skeleton variant="rounded" height={140} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  if (!data || data.items.length === 0) {
    return <Alert severity="info">No notes for this day yet.</Alert>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        Notes
      </Typography>

      <Grid container spacing={2}>
        {data.items.map((note) => (
          <Grid key={note.id} size={cardSize}>
            <Card
              variant="outlined"
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: 2,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{ position: "absolute", top: 8, right: 8, display: "flex" }}
              >
                <Tooltip title="Update">
                  <IconButton
                    size="small"
                    aria-label="Update note"
                    onClick={() => setEditingNote(note)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="Delete note"
                    disabled={isDeleting}
                    onClick={() => {
                      if (window.confirm("Delete this note?")) {
                        deleteNote(note.id);
                      }
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{ fontWeight: 600, pr: 9 }}
                >
                  {note.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {note.content || "No content"}
                </Typography>

                <Typography variant="caption" color="text.disabled">
                  {dayjs(note.createdDate).format("DD MMM YYYY, HH:mm")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {data.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={data.totalPages}
            page={data.currentPage}
            onChange={(_, page) => setPagination((prev) => ({ ...prev, page }))}
            color="primary"
            size="small"
          />
        </Box>
      )}

      {editingNote && (
        <UpdateDayNoteDialog
          key={editingNote.id}
          note={editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </Stack>
  );
}
