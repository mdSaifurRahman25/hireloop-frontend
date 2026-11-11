export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance"
  | string;

export type JobCategory =
  | "Engineering & Tech"
  | "Design"
  | "Product"
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Finance"
  | "Customer Support"
  | string;

export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type JobStatus = "Active" | "Expired";

export type SalaryFrequency =
  | "per hour"
  | "per day"
  | "per month"
  | "per year"
  | string;

export type BadgeType = "easy-apply" | "hot" | "neutral" | "senior";

/**
 * MongoDB document representation for jobs.
 */
export type JobDocument = {
  _id: string;
  title?: string;
  jobTitle?: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  frequency?: string | null;
  salaryFrequency?: string | null;
  responsibilities?: string | null;
  qualifications?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
};

/**
 * View model for recruiter dashboard table.
 */
export type JobPost = {
  id: string;
  title: string;
  department: string;
  companyName: string;
  city: string;
  workMode: WorkMode;
  jobType: string;
  compensation: string;
  applicants: number;
  status: JobStatus;
  deadline: string;
  timeline: string;
};

/**
 * Public browse jobs card view model.
 */
export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category?: string;
  workMode?: WorkMode;
  level?: string;
  badge?: {
    label: string;
    type: BadgeType;
  };
  logoColor: "cyan" | "blue" | "amber" | "indigo";
}

/**
 * Public single job details view model.
 */
export interface JobDetails {
  id: string;
  title: string;
  company: string;
  isVerified: boolean;
  salary: string;
  location: string;
  jobType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  skills: {
    label: string;
    icon: "figma" | "system" | "uiux" | "frontend";
  }[];
  requirements: string[];
  benefits: {
    label: string;
    icon: "health" | "401k" | "hardware" | "pto";
  }[];
  companySize: string;
  industry: string;
  websiteUrl: string;
  officeImage: string;
}

/**
 * Form payload when creating or updating a job post.
 */
export type JobPayload = Record<string, string>;

export type CreateJobResponse = {
  message: string;
  insertedId: string;
  job: Record<string, unknown>;
};

export type UpdateJobResponse = {
  message: string;
  matchedCount?: number;
  modifiedCount?: number;
  job?: Record<string, unknown>;
};

export type DeleteJobResponse = {
  acknowledged?: boolean;
  deletedCount?: number;
  message?: string;
};

export type BrowseJobsResponse = {
  jobs: JobDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  typeCounts?: Record<string, number>;
  categoryCounts?: Record<string, number>;
};
