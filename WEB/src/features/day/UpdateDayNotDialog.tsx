import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useUpdateDayNote } from "../../lib/hooks/useDayNote";
import type { DayNoteDto, UpdateDayNoteDto } from "../../lib/types/dayNote"; // adjust path

type Props = {
  note: DayNoteDto;
  onClose: () => void;
};

export default function UpdateDayNoteDialog({ note, onClose }: Props) {
  const [form, setForm] = useState<UpdateDayNoteDto>({
    id: note.id,
    title: note.title,
    content: note.content,
  });
  const { mutate, isPending, isError, error } = useUpdateDayNote();

  return (
    <Dialog
      open
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update note</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {isError && <Alert severity="error">{error.message}</Alert>}
          <TextField
            label="Title"
            value={form.title ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            fullWidth
            autoFocus
          />
          <TextField
            label="Content"
            value={form.content ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
            fullWidth
            multiline
            minRows={4}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => mutate(form, { onSuccess: onClose })}
          disabled={isPending || !form.title?.trim()}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
