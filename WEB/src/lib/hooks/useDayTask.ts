import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { PaginatedList, PaginationParams } from "../types/common";
import type {
  AddDayTaskDto,
  DayTaskDto,
  UpdateDayTaskDto,
} from "../types/dayTask";

export const useGetAllCurrentUserDayTasks = (
  pagination: PaginationParams,
  date: string,
) =>
  useQuery<PaginatedList<DayTaskDto>>({
    queryKey: ["daytask", date, pagination],
    queryFn: () =>
      agent
        .get<
          PaginatedList<DayTaskDto>
        >(`/DayTask/all-current-user-day-tasks/${date}`, { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

export function useAddDayTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddDayTaskDto) =>
      agent.post<string>("/DayTask/day-task", dto).then((res) => res.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["daytask", variables.date] });
    },
  });
}
export function useUpdateDayTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateDayTaskDto) =>
      agent.put<string>("/DayTask/day-task", dto).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daytask"] });
    },
  });
}

export function useDeleteDayTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      agent.delete<string>(`/DayTask/day-task/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daytask"] });
    },
  });
}
export const useGetDayTasksCount = () =>
  useQuery<number>({
    queryKey: ["daytaskcount"],
    queryFn: () =>
      agent.get<number>(`/DayTask/day-tasks-count`).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
export const useGetCompletedDayTasksCount = () =>
  useQuery<number>({
    queryKey: ["completeddaytaskcount"],
    queryFn: () => agent.get<number>(`/DayTask/completed-day-tasks-count`).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });