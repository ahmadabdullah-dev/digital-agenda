import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

const features = [
  {
    title: "Day notes",
    description: "Write down what happened today and find it again later.",
  },
  {
    title: "Tasks",
    description:
      "Keep a to-do list for each day and check items off as you go.",
  },
  {
    title: "Application tracker",
    description:
      "Save every place you have applied to, so you never apply twice.",
  },
];

export default function LandingPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3} component="main">
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
          Smart Digital Agenda
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 560 }}>
          Plan your days, write notes, and keep track of your applications in
          one place.
        </Typography>

        <Box>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/dashboard"
          >
            Go to dashboard
          </Button>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ mt: { xs: 6, md: 8 } }}
        component="section"
        aria-label="Features"
      >
        {features.map((feature) => (
          <Box key={feature.title} sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {feature.title}
            </Typography>
            <Typography color="text.secondary">
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Paper variant="outlined" sx={{ mt: { xs: 6, md: 8 }, p: 3 }}>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ fontWeight: 600 }}
          gutterBottom
        >
          Try it with a test account
        </Typography>
        <Typography>
          Email: <strong>user@test.com</strong>
        </Typography>
        <Typography>
          Password: <strong>Pa$$w0rd</strong>
        </Typography>
      </Paper>
    </Container>
  );
}
