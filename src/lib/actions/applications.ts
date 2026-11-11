import type {
  JobApplicationDocument,
  JobApplicationPayload,
  JobApplicationResponse,
} from "@/types";

const BASE_URI =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

/**
 * Sends a job application to the backend API.
 */
export const applyToJob = async (
  data: JobApplicationPayload,
): Promise<JobApplicationResponse> => {
  const response = await fetch(`${BASE_URI}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`POST /applications failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * Fetches applications from the backend.
 */
export const getApplications = async (
  params?: { email?: string; jobId?: string },
): Promise<JobApplicationDocument[]> => {
  const searchParams = new URLSearchParams();
  if (params?.email) searchParams.set("email", params.email);
  if (params?.jobId) searchParams.set("jobId", params.jobId);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const response = await fetch(`${BASE_URI}/applications${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GET /applications failed with status ${response.status}`);
  }

  return response.json();
};

export default applyToJob;
