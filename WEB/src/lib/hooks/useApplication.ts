import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type {
  AddApplicationDto,
  ApplicationDto,
  UpdateApplicationDto,
} from "../types/application";
import type { PaginatedList, PaginationParams } from "../types/common";

export const useGetAllApplications = (pagination: PaginationParams) =>
  useQuery<PaginatedList<ApplicationDto>>({
    queryKey: ["applications", pagination],
    queryFn: () =>
      agent
        .get<
          PaginatedList<ApplicationDto>
        >("/Application/all-applications", { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
export function useAddApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddApplicationDto) =>
      agent
        .post<string>("/Application/application", dto)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-counts"] });
    },
  });
}
export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateApplicationDto) =>
      agent
        .put<string>("/Application/application", dto)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-counts"] });

    },
  });
}
export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      agent
        .delete<string>(`/Application/application/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-counts"] });

    },
  });
}


export const useApplicationStats = () => {
  return useQuery({
    queryKey: ["application-counts"],
    queryFn: async () => {
      const response = await agent.get<Record<string, Record<string, number>>>("/application/application-counts",
      );
      return response.data;
    },
  });
};