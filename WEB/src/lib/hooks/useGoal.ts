import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginatedList, PaginationParams } from "../types/common";
import type { AddGoalDto, GoalDto } from "../types/goal";
import agent from "../api/agent";

export const useGetAllCurrentUserGoals = (pagination: PaginationParams) =>
  useQuery<PaginatedList<GoalDto>>({
    queryKey: ["CurrentUsergoals", pagination],
    queryFn: () =>
      agent
        .get<
          PaginatedList<GoalDto>
        >(`/Goal/all-current-user-goals`, { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

export const useGetCurrentUserCompletedGoalsCount = () =>
  useQuery<number>({
    queryKey: ["CurrentUserCompletedGoalsCount"],
    queryFn: () =>
      agent.get<number>(`/Goal/completed-goals-count`).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
export const useGetCurrentUserGoalsCount = () =>
  useQuery<number>({
    queryKey: ["CurrentUserGoalsCount"],
    queryFn: () =>
      agent.get<number>(`/Goal/goals-count`).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  export function useAddGoalToCurrentUSer() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (dto: AddGoalDto) =>
        agent.post<string>("/Goal/goal", dto).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["CurrentUserGoalsCount"] });
        queryClient.invalidateQueries({ queryKey: ["CurrentUserCompletedGoalsCount"] });
        queryClient.invalidateQueries({ queryKey: ["CurrentUsergoals"] });
      },
    });
  };