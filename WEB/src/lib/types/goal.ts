export interface GoalDto {
  id: string;
  title: string;
  isCompleted: boolean;
  period: string;
  createdAt: string;
}
export interface AddGoalDto {
  title: string;
  period: string;
}