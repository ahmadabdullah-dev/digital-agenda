import { useState } from "react";
import type { FormEvent } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function FastDaySearch() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    const date = dayjs(
      `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    );

    // dayjs rolls invalid dates over (Feb 31 -> Mar 3), so compare the parts back
    const isValid =
      date.isValid() &&
      date.year() === y &&
      date.month() + 1 === m &&
      date.date() === d;

    if (!isValid) {
      setError("Enter a valid date");
      return;
    }

    setError("");
    navigate(`/day/${date.format("YYYY-MM-DD")}`);
  };

  const onlyDigits = (value: string) => value.replace(/\D/g, "");

  return (
    <Paper
      variant="outlined"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ m:2, p: { xs: 2, sm: 3 }, borderRadius: 2 }}
    >
      <Typography
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
          lineHeight: 1.3,
        }}
      >
        Go to a day
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mt: 0.5, mb: { xs: 2, sm: 2.5 } }}
      >
        Enter a date to jump straight to it.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1.4fr 1fr 1fr",
            sm: "1.4fr 1fr 1fr auto",
          },
          columnGap: { xs: 1.5, sm: 2 },
          rowGap: 2,
          alignItems: "start",
        }}
      >
        <TextField
          label="Year"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(onlyDigits(e.target.value))}
          error={!!error}
          slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 4 } }}
        />
        <TextField
          label="Month"
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(onlyDigits(e.target.value))}
          error={!!error}
          slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 2 } }}
        />
        <TextField
          label="Day"
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(onlyDigits(e.target.value))}
          error={!!error}
          slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 2 } }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!year || !month || !day}
          sx={{
            gridColumn: { xs: "1 / -1", sm: "auto" },
            height: { xs: 48, sm: 56 },
            px: 4,
          }}
        >
          Go
        </Button>

        {error && (
          <FormHelperText error sx={{ gridColumn: "1 / -1", m: 0 }}>
            {error}
          </FormHelperText>
        )}
      </Box>
    </Paper>
  );
}
