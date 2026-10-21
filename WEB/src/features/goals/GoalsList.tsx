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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useDeleteCurrentUserGoal, useGetAllCurrentUserGoals } from "../../lib/hooks/useGoal";
import type { PaginationParams } from "../../lib/types/common";
import type { GoalDto } from "../../lib/types/goal";
import UpdateGoalDialog from "./UpdateGoalDialog";
import { DeleteOutlineOutlined } from "@mui/icons-material";

export default function GoalsList() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });
  const [editingGoal, setEditingGoal] = useState<GoalDto | null>(null);
  const { mutate: deleteGoal, isPending: isDeleting } = useDeleteCurrentUserGoal();

  const { data, isPending, isError, error } =
    useGetAllCurrentUserGoals(pagination);

  if (isPending) {
    return (
      <Stack spacing={1.5}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            sx={{ height: { xs: 72, sm: 80 }, borderRadius: 2 }}
          />
        ))}
      </Stack>
    );
  }

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  if (!data || data.items.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          py: 6,
          borderRadius: 2,
          borderStyle: "dashed",
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>No goals yet.</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 2 }}>
        <List disablePadding>
          {data.items.map((goal, index) => (
            <ListItem
              key={goal.id}
              disablePadding
              divider={index < data.items.length - 1}
              secondaryAction={
                <Box>
                      <Tooltip title="Edit">
                  <IconButton
                    edge="end"
                    size="small"
                    aria-label="Edit goal"
                    onClick={() => setEditingGoal(goal)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                    <Tooltip title="Delete">
                    <IconButton
                        size="small"
                        color="error"
                        aria-label="Delete goal"
                        disabled={isDeleting}
                            onClick={() => {
                        if (window.confirm("Delete this goal?")) {
                        deleteGoal(goal.id);
                            }
                        }}>
                    <DeleteOutlineOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
              
              }
              sx={{ "& .MuiListItemSecondaryAction-root": { right: 16 } }}
            >
              <ListItemButton
                sx={{
                  pl: { xs: 2, sm: 3 },
                  pr: 7,
                  py: { xs: 1.5, sm: 2 },
                  borderLeft: "4px solid",
                  borderLeftColor: goal.isCompleted
                    ? "success.main"
                    : "primary.main",
                  transition: "background-color 0.2s ease",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemText
                  primary={goal.title}
                  secondary={
                    <Stack
                      component="span"
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        mt: 1,
                        columnGap: 1.5,
                        rowGap: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          px: 1.25,
                          py: 0.25,
                          borderRadius: 10,
                          bgcolor: "action.selected",
                          color: goal.isCompleted
                            ? "success.main"
                            : "primary.main",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: 0.3,
                          textTransform: "capitalize",
                          lineHeight: 1.6,
                        }}
                      >
                        {goal.period}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.disabled"
                      >
                        <Box
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          {dayjs(goal.createdAt).format("DD MMM")}
                        </Box>
                        <Box
                          component="span"
                          sx={{ display: { xs: "none", sm: "inline" } }}
                        >
                          {dayjs(goal.createdAt).format("DD MMM, HH:mm")}
                        </Box>
                      </Typography>
                    </Stack>
                  }
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 600,
                        fontSize: { xs: "0.9375rem", sm: "1.0625rem" },
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: { xs: 2, sm: 1 },
                        overflow: "hidden",
                        wordBreak: "break-word",
                        textDecoration: goal.isCompleted
                          ? "line-through"
                          : "none",
                        color: goal.isCompleted
                          ? "text.disabled"
                          : "text.primary",
                      },
                    },
                    secondary: { component: "div" },
                  }}
                  sx={{
                    m: 0,
                    minWidth: 0,
                    opacity: goal.isCompleted ? 0.7 : 1,
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
            onChange={(_, page) => setPagination((prev) => ({ ...prev, page }))}
            shape="rounded"
            size="small"
            siblingCount={0}
          />
        </Box>
      )}

      {editingGoal && (
        <UpdateGoalDialog
          key={editingGoal.id}
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
        />
      )}
    </Stack>
  );
}
