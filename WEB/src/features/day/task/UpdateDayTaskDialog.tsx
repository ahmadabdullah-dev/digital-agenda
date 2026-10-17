import { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import type { DayTaskDto, UpdateDayTaskDto } from "../../../lib/types/dayTask";
import { useUpdateDayTask } from "../../../lib/hooks/useDayTask";

type Props = {
  task: DayTaskDto;
  onClose: () => void;
};

export default function UpdateDayTaskDialog({ task, onClose }: Props) {
  const [form, setForm] = useState<UpdateDayTaskDto>({
    id: task.id,
    title: task.title,
    isCompleted: task.isCompleted,
  });
  const { mutate, isPending, isError, error } = useUpdateDayTask();

  return (
    <Dialog
      open
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update task</DialogTitle>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isCompleted ?? false}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isCompleted: e.target.checked }))
                }
              />
            }
            label="Completed"
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
