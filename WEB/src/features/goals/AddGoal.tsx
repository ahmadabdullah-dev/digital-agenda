import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import type { AddGoalDto } from "../../lib/types/goal";
import { useAddGoalToCurrentUSer } from "../../lib/hooks/useGoal";

const emptyForm: AddGoalDto = { title: "", period: "" };

export default function AddGoal() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, data, error } =
    useAddGoalToCurrentUSer();

  const { control, handleSubmit, reset } = useForm<AddGoalDto>({
    defaultValues: emptyForm,
  });

  const onSubmit = (values: AddGoalDto) => {
    mutate(
      { title: values.title.trim(), period: values.period.trim() },
      {
        onSuccess: () => {
          reset(emptyForm);
          queryClient.invalidateQueries({
            queryKey: ["CurrentUserGoalsCount"],
          });
          queryClient.invalidateQueries({
            queryKey: ["CurrentUserCompletedGoalsCount"],
          });
        },
      },
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%", mx: "auto", p: { xs: 1, sm: 2 } }}
    >
      <Stack spacing={2.5}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Title is required",
            validate: (v) => v.trim().length > 0 || "Title is required",
            maxLength: { value: 200, message: "Max 200 characters" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="period"
          control={control}
          rules={{
            required: "Period is required",
            validate: (v) => v.trim().length > 0 || "Period is required",
            maxLength: { value: 50, message: "Max 50 characters" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Period"
              placeholder="e.g. this month, 2026, 10 years"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ alignSelf: { xs: "stretch", sm: "flex-end" }, px: 4 }}
        >
          {isPending ? "Adding Goal..." : "Add Goal"}
        </Button>

        {isError && <Alert severity="error">{error.message}</Alert>}
        {isSuccess && <Alert severity="success">{data}</Alert>}
      </Stack>
    </Box>
  );
}
