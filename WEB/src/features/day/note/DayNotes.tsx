import { useState } from "react";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
      <Stack spacing={1}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={88} />
        ))}
      </Stack>
    );
  }

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  if (!data || data.items.length === 0) {
    return (
      <Typography color="text.secondary">No notes for this day yet.</Typography>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Paper variant="outlined">
          <List disablePadding>
            {data.items.map((note, index) => (
              <ListItem
                key={note.id}
                disablePadding
                divider={index < data.items.length - 1}
                secondaryAction={
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        aria-label="Edit note"
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
                }
              >
                <ListItemButton
                  onClick={() => setEditingNote(note)}
                  sx={{ py: 1.5, pr: 11, alignItems: "flex-start" }}
                >
                  <ListItemText
                    primary={note.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {note.content || "No content"}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.disabled"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          {dayjs(note.createdDate).format("DD MMM, HH:mm")}
                        </Typography>
                      </>
                    }
                    slotProps={{
                      primary: { noWrap: true, sx: { fontWeight: 500 } },
                      secondary: { component: "div" },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {data.totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={data.totalPages}
              page={data.currentPage}
              onChange={(_, page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
              size="small"
            />
          </Box>
        )}
      </Stack>

      {editingNote && (
        <UpdateDayNoteDialog
          key={editingNote.id}
          note={editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </>
  );
}
