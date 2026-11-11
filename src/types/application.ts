/**
 * Application status states matching the recruitment workflow.
 */
export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Rejected"
  | "Offered";

/**
 * Visual role category icon types.
 */
export type ApplicationIconType =
  | "code"
  | "design"
  | "data"
  | "cloud"
  | "ai"
  | "general";

/**
 * Payload sent when applying for a job.
 */
export interface JobApplicationPayload {
  jobId: string;
  jobTitle: string;
  companyName: string;
  salary: string;
  location: string;
  applicantName: string;
  applicantEmail: string;
  portfolioUrl?: string;
  appliedAt: string;
  status?: ApplicationStatus;
}

/**
 * Backend response when an application is saved.
 */
export interface JobApplicationResponse {
  acknowledged?: boolean;
  insertedId?: string;
  message?: string;
}

/**
 * Persisted application document in MongoDB.
 */
export interface JobApplicationDocument extends JobApplicationPayload {
  _id: string;
  id?: string;
}

/**
 * UI presentation model for the seeker application table.
 */
export interface ApplicationItem {
  id: string;
  jobId?: string;
  title: string;
  type: string;
  workMode: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  iconType: ApplicationIconType;
  salary?: string;
  location?: string;
  applicantName?: string;
  applicantEmail?: string;
  portfolioUrl?: string;
  appliedAt?: string;
}

/**
 * Aggregated metrics for applicant dashboard stat cards.
 */
export interface ApplicationMetrics {
  totalApplied: number;
  shortlisted: number;
  interviews: number;
  successRate: string;
}
