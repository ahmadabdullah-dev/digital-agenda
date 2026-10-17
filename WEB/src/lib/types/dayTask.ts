export type DayTaskDto = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdDate: string;
};
export type AddDayTaskDto = {
  date: string;
  title: string;
};