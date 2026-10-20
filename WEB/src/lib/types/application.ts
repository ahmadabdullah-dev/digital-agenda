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

export const TYPES = [
  "Job",
  "University",
  "Scholarship",
  "Internship",
  "Other",
];
export const STATUSES = [
  "Applied",
  "Under Review",
  "Interview",
  "Accepted",
  "Rejected",
  "Withdrawn",
];

export interface UpdateApplicationDto {
   applicationId: string;
   title?: string;
   institutionName?: string;
   institutionLink?: string;
   type?: number;
   status?: number;
   appliedDate?: string;
   deadline?: string;
   notes?: string;
}