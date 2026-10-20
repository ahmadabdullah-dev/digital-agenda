import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { ApplicationDto } from "../types/application";
import type { PaginatedList, PaginationParams } from "../types/common";

export const useGetAllApplications = (pagination: PaginationParams) =>
  useQuery<PaginatedList<ApplicationDto>>({
    queryKey: ["applications", pagination],
    queryFn: () =>
      agent.get<PaginatedList<ApplicationDto>>("/Application/all-applications", {params: pagination})
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });