import { Box, Container, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import AddApplication from "./AddApplication";
import ApplicationsList from "./ApplicationsList";
import ApplicationStats from "./ApplicationStats";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section">
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1.5 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default function ApplicationsDashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: { xs: 2.5, md: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Applications
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Track every application and where it stands.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            alignItems: "start",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" },
          }}
        >
          <Box
            sx={{
              order: { xs: 1, lg: 2 },
              position: { lg: "sticky" },
              top: { lg: 24 },
            }}
          >
            <Section title="Add application">
              <Paper
                variant="outlined"
                sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3 }}
              >
                <AddApplication />
              </Paper>
            </Section>
          </Box>

          <Box sx={{ order: { xs: 2, lg: 1 }, minWidth: 0 }}>
            <Section title="All applications">
              <ApplicationsList />
            </Section>
          </Box>
        </Box>
      </Box>
      <Section title="Overview">
        <ApplicationStats />
      </Section>
    </Container>
  );
}
