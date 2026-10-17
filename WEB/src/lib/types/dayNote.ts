export type AddDayNoteDto = {
  date: string;
  title: string;
  content?: string | null;
};
export type DayNoteDto = {
  id: string;
  title: string;
  content?: string | null;
  createdDate: string;
};
export type UpdateDayNoteDto = {
  id: string;
  title?: string | null;
  content?: string | null;
};