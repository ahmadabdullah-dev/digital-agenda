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
import type { GoalDto, UpdateCurrentUserGoalDto } from "../../lib/types/goal";
import { useUpdateCurrentUserGoal } from "../../lib/hooks/useGoal";

type Props = {
  goal: GoalDto;
  onClose: () => void;
};

export default function UpdateGoalDialog({ goal, onClose }: Props) {
  const [form, setForm] = useState<UpdateCurrentUserGoalDto>({
    id: goal.id,
    title: goal.title,
    period: goal.period,
  });
  const { mutate, isPending, isError, error } = useUpdateCurrentUserGoal();

  return (
    <Dialog
      open
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update goal</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {isError && <Alert severity="error">{error.message}</Alert>}
          <TextField
            label="Title"
            value={form.title ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            fullWidth
            autoFocus
            slotProps={{ htmlInput: { maxLength: 200 } }}
          />
          <TextField
            label="Period"
            value={form.period ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 50 } }}
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
          disabled={isPending || !form.title?.trim() || !form.period?.trim()}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
