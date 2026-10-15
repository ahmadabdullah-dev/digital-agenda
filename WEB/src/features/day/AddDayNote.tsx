import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type { AddDayNoteDto } from "../../lib/types/dayNote";
import { useAddDayNote } from "../../lib/hooks/useDayNote";

type Props = {
  date: string;
};

export default function AddDayNote({ date }: Props) {
  const { mutate, isPending, isSuccess, isError, data, error } =
    useAddDayNote();

  const emptyForm: AddDayNoteDto = { date, title: "", content: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDayNoteDto>({ defaultValues: emptyForm });

  const onSubmit = (values: AddDayNoteDto) => {
    mutate(
      { ...values, content: values.content?.trim() || null },
     
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%", maxWidth: 600, mx: "auto", p: { xs: 1, sm: 2 } }}
    >
      <Stack spacing={2}>
        <TextField
          label="Title"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Content"
          fullWidth
          multiline
          minRows={3}
          {...register("content")}
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
        {isSuccess && <Alert severity="success">{data}</Alert>}
      </Stack>
    </Box>
  );
}
