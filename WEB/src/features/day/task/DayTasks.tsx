import { useState } from "react";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import type { PaginationParams } from "../../../lib/types/common";
import {
  useDeleteDayTask,
  useGetAllCurrentUserDayTasks,
} from "../../../lib/hooks/useDayTask";
import type { DayTaskDto } from "../../../lib/types/dayTask";
import UpdateDayTaskDialog from "./UpdateDayTaskDialog";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";

type Props = {
  date: string;
};

const cardSize = { xs: 12, sm: 6, lg: 4 };

export default function DayTasks({ date }: Props) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });
  const [editingTask, setEditingTask] = useState<DayTaskDto | null>(null);
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteDayTask();

  const { data, isPending, isError, error } = useGetAllCurrentUserDayTasks(
    pagination,
    date,
  );

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
    return <Alert severity="info">No tasks for this day yet.</Alert>;
  }

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Tasks
        </Typography>

        <Grid container spacing={2}>
          {data.items.map((task) => (
            <Grid key={task.id} size={cardSize}>
              <Card
                variant="outlined"
                onClick={() => setEditingTask(task)}
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 2,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                  }}
                >
                  <Tooltip title="Update">
                    <IconButton
                      size="small"
                      aria-label="Update task"
                      onClick={() => setEditingTask(task)}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="Delete task"
                      disabled={isDeleting}
                      onClick={() => {
                        if (window.confirm("Delete this task?")) {
                          deleteNote(task.id);
                        }
                      }}
                    >
                      <DeleteOutlineOutlined fontSize="small" />
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
                    sx={{
                      fontWeight: 600,
                      pr: 9,
                      textDecoration: task.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </Typography>

                  <Typography variant="caption" color="text.disabled">
                    {dayjs(task.createdDate).format("DD MMM YYYY, HH:mm")}
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
              onChange={(_, page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
              color="primary"
              size="small"
            />
          </Box>
        )}
      </Stack>

      {editingTask && (
        <UpdateDayTaskDialog
          key={editingTask.id}
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  );
}
