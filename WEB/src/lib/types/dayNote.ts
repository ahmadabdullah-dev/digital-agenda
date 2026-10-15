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
}