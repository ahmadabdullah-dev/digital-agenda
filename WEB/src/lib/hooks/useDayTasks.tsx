import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { PaginatedList, PaginationParams } from "../types/common";
import type { DayTaskDto } from "../types/dayTask";

export const useGetAllCurrentUserDayTasks = (pagination: PaginationParams, date: string) =>
  useQuery<PaginatedList<DayTaskDto>>({
    queryKey: ["daytask", date, pagination],
    queryFn: () =>
      agent.get<PaginatedList<DayTaskDto>>(`/DayTask/all-current-user-day-tasks/${date}`, { params: pagination })
    .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
