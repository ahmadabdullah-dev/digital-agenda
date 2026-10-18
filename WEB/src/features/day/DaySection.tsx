import { Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

export default function DaySection({ title, children }: Props) {
  return (
    <Paper
      variant="outlined"
      component="section"
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: "100%" }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
}
