import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type {
  UpdateApplicationDto,
  ApplicationDto,
} from "../../lib/types/application";
import { STATUSES, TYPES } from "../../lib/types/application";
import { useUpdateApplication } from "../../lib/hooks/useApplication";

type Props = {
  application: ApplicationDto & { applicationId?: string };
  onClose: () => void;
};

const getIndex = (value: string | number, list: string[]) => {
  if (typeof value === "number") return value;
  const index = list.indexOf(value);
  return index !== -1 ? index : 0;
};

export default function UpdateApplicationDialog({
  application,
  onClose,
}: Props) {
  const { mutate, isPending, isError, error } = useUpdateApplication();

  const [form, setForm] = useState<UpdateApplicationDto>(() => ({
    applicationId: application?.applicationId || application?.id,
    title: application?.title || "",
    institutionName: application?.institutionName || "",
    institutionLink: application?.institutionLink || "",
    type: getIndex(application?.type, TYPES),
    status: getIndex(application?.status, STATUSES),
    appliedDate: application?.appliedDate || "",
    deadline: application?.deadline || "",
    notes: application?.notes || "",
  }));

  const handleSave = () => {
    if (!form.title?.trim()) return;

    const cleanedData: UpdateApplicationDto = {
      ...form,
      title: form.title.trim(),
      institutionName: form.institutionName?.trim() || undefined,
      institutionLink: form.institutionLink?.trim() || undefined,
      deadline: form.deadline || undefined,
      notes: form.notes?.trim() || undefined,
    };

    mutate(cleanedData, { onSuccess: onClose });
  };

  return (
    <Dialog
      open
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update application</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {isError && (
            <Alert severity="error">{(error as Error).message}</Alert>
          )}

          <TextField
            label="Title"
            required
            value={form.title ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            fullWidth
            autoFocus
            slotProps={{ htmlInput: { maxLength: 200 } }}
          />

          <TextField
            label="Institution name"
            value={form.institutionName ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, institutionName: e.target.value }))
            }
            fullWidth
            slotProps={{ htmlInput: { maxLength: 200 } }}
          />

          <TextField
            label="Institution link"
            type="url"
            placeholder="https://..."
            value={form.institutionLink ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, institutionLink: e.target.value }))
            }
            fullWidth
            slotProps={{ htmlInput: { maxLength: 2000 } }}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Type"
              value={form.type ?? 0}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: Number(e.target.value) }))
              }
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
              value={form.status ?? 0}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: Number(e.target.value) }))
              }
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
              value={form.appliedDate ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, appliedDate: e.target.value }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              type="date"
              label="Deadline"
              value={form.deadline ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, deadline: e.target.value }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>

          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={form.notes ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 4000 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isPending || !form.title?.trim()}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
