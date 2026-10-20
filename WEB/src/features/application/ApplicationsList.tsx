import { useState } from "react";
import {
  Alert,
  Box,
  Chip,
  IconButton,
  Link,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { PaginationParams } from "../../lib/types/common";
import { Shared } from "../../lib/shared";
import UpdateApplicationDialog from "./UpdateApplicationDialog";
import { useGetAllApplications } from "../../lib/hooks/useApplication";
import type { UpdateApplicationDto } from "../../lib/types/application";

type ChipColor = "default" | "info" | "warning" | "success" | "error";

const statusColor = (status: string): ChipColor => {
  switch (status.toLowerCase()) {
    case "applied":
      return "info";
    case "interview":
      return "warning";
    case "accepted":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

export default function ApplicationsList() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });
  const [editingApp, setEditingApp] = useState<UpdateApplicationDto | null>(
    null,
  );

  const { data, isPending, isError, error } = useGetAllApplications(pagination);

  if (isPending) {
    return (
      <Stack spacing={1.5}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={96} />
        ))}
      </Stack>
    );
  }

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  if (!data || data.items.length === 0) {
    return <Typography color="text.secondary">No applications yet.</Typography>;
  }

  return (
    <>
      <Stack spacing={2}>
        <Stack spacing={1.5} sx={{ padding: 1 }}>
          {data.items.map((a) => (
            <Paper
              key={a.id}
              variant="outlined"
              sx={{ p: 2, position: "relative" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, minWidth: 0, wordBreak: "break-word" }}
                >
                  {a.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                  <Chip
                    label={a.status}
                    size="small"
                    color={statusColor(a.status)}
                    sx={{ flexShrink: 0 }}
                  />
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        aria-label="Edit application"
                        onClick={() =>
                          setEditingApp({
                            applicationId: a.id,
                            title: a.title,
                            institutionName: a.institutionName || "",
                            institutionLink: a.institutionLink || "",
                            type: typeof a.type === "number" ? a.type : 0,
                            status: typeof a.status === "number" ? a.status : 0,
                            appliedDate: a.appliedDate || "",
                            deadline: a.deadline || "",
                            notes: a.notes || "",
                          })
                        }
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </Box>

              {(a.institutionName || a.type) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.25 }}
                >
                  {a.institutionName &&
                    (a.institutionLink ? (
                      <Link
                        href={a.institutionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {a.institutionName}
                      </Link>
                    ) : (
                      a.institutionName
                    ))}
                  {a.institutionName && a.type && " · "}
                  {a.type}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  columnGap: 2,
                  mt: 1,
                  color: "text.disabled",
                }}
              >
                <Typography variant="caption">
                  Applied {Shared.formatDate(a.appliedDate)}
                </Typography>
                <Typography variant="caption">
                  {a.deadline
                    ? `Deadline ${Shared.formatDate(a.deadline)}`
                    : "No deadline"}
                </Typography>
              </Box>

              {a.notes && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {a.notes}
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>

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

      {editingApp && (
        <UpdateApplicationDialog
          key={editingApp.applicationId}
          application={editingApp}
          onClose={() => setEditingApp(null)}
        />
      )}
    </>
  );
}
