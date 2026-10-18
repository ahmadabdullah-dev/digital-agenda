import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type {
  AddDayNoteDto,
  DayNoteDto,
  UpdateDayNoteDto,
} from "../types/dayNote";
import type { PaginatedList, PaginationParams } from "../types/common";

export function useAddDayNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddDayNoteDto) =>
      agent.post<string>("/DayNote/day-note", dto).then((res) => res.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["daynote", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["NotesCount", variables.date] });

    },
  });
}
export const useGetAllCurrentUserDayNotes = (
  pagination: PaginationParams,
  date: string,
) =>
  useQuery<PaginatedList<DayNoteDto>>({
    queryKey: ["daynote", date, pagination],
    queryFn: () =>
      agent
        .get<
          PaginatedList<DayNoteDto>
        >(`/DayNote/all-curent-user-day-notes/${date}`, { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

export function useUpdateDayNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateDayNoteDto) =>
      agent.put<string>("/DayNote/day-note", dto).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daynote"] });
      queryClient.invalidateQueries({ queryKey: ["NotesCount"] });

    },
  });
}
export function useDeleteDayNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      agent.delete<string>(`/DayNote/day-note/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daynote"] });
      queryClient.invalidateQueries({ queryKey: ["NotesCount"] });
    },
  });
}
export const useGetAllDaysNotesCount = () =>
  useQuery<number>({
    queryKey: ["AllDaysNotesCount"],
    queryFn: () =>
      agent
        .get<number>(`/DayNote/all-days-notes-count`)
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
export const useGetNotesCount = (date: string) =>
  useQuery<number>({
    queryKey: ["NotesCount", date],
    queryFn: () =>
      agent
        .get<number>(`/DayNote/day-notes-count/${date}`)
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });