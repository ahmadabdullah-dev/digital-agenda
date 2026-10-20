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

export interface AddApplicationDto {
  title: string;
  institutionName?: string | null;
  institutionLink?: string | null;
  type: number;
  status: number;
  appliedDate: string;
  deadline?: string | null;
  notes?: string | null;
}

export const TYPES = ["Job", "University", "Scholarship", "Internship", "Other"];
export const STATUSES = [
  "Applied",
  "Under Review",
  "Interview",
  "Accepted",
  "Rejected",
  "Withdrawn",
];