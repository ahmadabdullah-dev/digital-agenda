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
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import type { PaginationParams } from "../../../lib/types/common";
import {
  useDeleteDayTask,
  useGetAllCurrentUserDayTasks,
} from "../../../lib/hooks/useDayTask";
import type { DayTaskDto } from "../../../lib/types/dayTask";
import UpdateDayTaskDialog from "./UpdateDayTaskDialog";

type Props = {
  date: string;
};

export default function DayTasks({ date }: Props) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });
  const [editingTask, setEditingTask] = useState<DayTaskDto | null>(null);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteDayTask();

  const { data, isPending, isError, error } = useGetAllCurrentUserDayTasks(
    pagination,
    date,
  );

  if (isPending) {
    return (
      <Stack spacing={1}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={56} />
        ))}
      </Stack>
    );
  }

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  if (!data || data.items.length === 0) {
    return (
      <Typography color="text.secondary">No tasks for this day yet.</Typography>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Paper variant="outlined">
          <List disablePadding>
            {data.items.map((task, index) => (
              <ListItem
                key={task.id}
                disablePadding
                divider={index < data.items.length - 1}
                secondaryAction={
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        aria-label="Edit task"
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
                            deleteTask(task.id);
                          }
                        }}
                      >
                        <DeleteOutlineOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <ListItemButton
                  onClick={() => setEditingTask(task)}
                  sx={{ py: 1.5, pr: 11 }}
                >
                  <ListItemText
                    primary={task.title}
                    secondary={dayjs(task.createdDate).format("DD MMM, HH:mm")}
                    slotProps={{
                      primary: {
                        noWrap: true,
                        sx: {
                          fontWeight: 500,
                          textDecoration: task.isCompleted
                            ? "line-through"
                            : "none",
                          color: task.isCompleted
                            ? "text.secondary"
                            : "text.primary",
                        },
                      },
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
