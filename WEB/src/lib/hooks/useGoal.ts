import { useQuery } from "@tanstack/react-query";
import type { PaginatedList, PaginationParams } from "../types/common";
import type { GoalDto } from "../types/goal";
import agent from "../api/agent";

export const useGetAllCurrentUserGoals = (
  pagination: PaginationParams) =>
  useQuery<PaginatedList<GoalDto>>({
    queryKey: ["goals", pagination],
    queryFn: () =>
      agent.get<PaginatedList<GoalDto>
        >(`/Goal/all-current-user-goals`, { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
