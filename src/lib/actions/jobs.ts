import type {
  CreateJobResponse,
  DeleteJobResponse,
  JobPayload,
  UpdateJobResponse,
} from "@/types";

export type { CreateJobResponse, DeleteJobResponse, JobPayload, UpdateJobResponse };

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export const createJob = async (
  data: JobPayload,
): Promise<CreateJobResponse> => {
  const response = await fetch(`${BASE_URI}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ?? `Could not publish the job (HTTP ${response.status}).`,
    );
  }

  return result as CreateJobResponse;
};

export const updateJob = async (
  jobId: string,
  data: JobPayload,
): Promise<UpdateJobResponse> => {
  const response = await fetch(`${BASE_URI}/jobs/${jobId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      result?.message ?? `Failed to update job (HTTP ${response.status})`,
    );
  }
  return result as UpdateJobResponse;
};

export const deleteJob = async (jobId: string): Promise<DeleteJobResponse> => {
  const response = await fetch(`${BASE_URI}/jobs/${jobId}`, {
    method: "DELETE",
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      result?.message ?? `Failed to delete job (HTTP ${response.status})`,
    );
  }
  return result as DeleteJobResponse;
};
