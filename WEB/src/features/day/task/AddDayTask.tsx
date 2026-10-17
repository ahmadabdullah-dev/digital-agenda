import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type { AddDayTaskDto } from "../../../lib/types/dayTask";
import { useAddDayTask } from "../../../lib/hooks/useDayTask";

type Props = {
  date: string;
};

export default function AddDayTask({ date }: Props) {
  const { mutate, isPending, isSuccess, isError, data, error } =
    useAddDayTask();

  const emptyForm: AddDayTaskDto = { date, title: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDayTaskDto>({ defaultValues: emptyForm });

  const onSubmit = (values: AddDayTaskDto) => {
    mutate({ ...values });
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
