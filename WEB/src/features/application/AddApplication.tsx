import { useState } from "react";
import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import type { AddApplicationDto } from "../../lib/types/application";
import { STATUSES, TYPES } from "../../lib/types/application";
import { useAddApplication } from "../../lib/hooks/useApplication";

const today = () => dayjs().format("YYYY-MM-DD");

export default function AddApplication() {
  const { mutate, isPending, isSuccess, isError, error } = useAddApplication();

  const [title, setTitle] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [institutionLink, setInstitutionLink] = useState("");
  const [type, setType] = useState(0);
  const [status, setStatus] = useState(0);
  const [appliedDate, setAppliedDate] = useState(today());
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setTitle("");
    setInstitutionName("");
    setInstitutionLink("");
    setType(0);
    setStatus(0);
    setAppliedDate(today());
    setDeadline("");
    setNotes("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dto: AddApplicationDto = {
      title: title.trim(),
      institutionName: institutionName.trim() || null,
      institutionLink: institutionLink.trim() || null,
      type,
      status,
      appliedDate,
      deadline: deadline || null,
      notes: notes.trim() || null,
    };

    mutate(dto, { onSuccess: resetForm });
  };

  return (
    <Stack
      component="form"
      onSubmit={submit}
      spacing={2}
      sx={{ width: "100%", maxWidth: 600, mx: "auto", p: { xs: 1, sm: 2 } }}
    >
      <TextField
        label="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
      />

      <TextField
        label="Institution name"
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
      />

      <TextField
        label="Institution link"
        type="url"
        placeholder="https://..."
        value={institutionLink}
        onChange={(e) => setInstitutionLink(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 2000 } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          fullWidth
          label="Type"
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
        >
          {TYPES.map((t, i) => (
            <MenuItem key={t} value={i}>
              {t}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          {STATUSES.map((s, i) => (
            <MenuItem key={s} value={i}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          required
          type="date"
          label="Applied date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          type="date"
          label="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Stack>

      <TextField
        label="Notes"
        multiline
        minRows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 4000 } }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isPending}
        sx={{ alignSelf: { xs: "stretch", sm: "flex-end" } }}
      >
        {isPending ? "Adding..." : "Add"}
      </Button>

      {isError && <Alert severity="error">{error.message}</Alert>}
      {isSuccess && <Alert severity="success">Application added.</Alert>}
    </Stack>
  );
}
