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
} from "@mui/material";
import type { PaginationParams } from "../../lib/types/common";
import { useGetAllCurrentUserDayNotes } from "../../lib/hooks/useDayNote";

type Props = {
  date: string;
};

const cardSize = { xs: 12, sm: 6, lg: 4 };

export default function DayNotes({ date }: Props) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });

  const { data, isPending, isError, error } = useGetAllCurrentUserDayNotes(
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
                height: "100%",
                borderRadius: 2,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: 2,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
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
    </Stack>
  );
}
