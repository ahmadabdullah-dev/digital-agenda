export interface ApplicationDto {
  id: string;
  title: string;
  institutionName?: string | null;
  institutionLink?: string | null;
  type: string;
  status: string;
  appliedDate: string; 
  deadline?: string | null;
  notes?: string | null;
}
