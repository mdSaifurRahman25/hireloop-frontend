const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

// Every value read from the form is a string; the API converts what it needs.
export type JobPayload = Record<string, string>;

export type CreateJobResponse = {
  message: string;
  insertedId: string;
  job: Record<string, unknown>;
};

export const createJob = async (
  data: JobPayload,
): Promise<CreateJobResponse> => {
  const response = await fetch(`${BASE_URI}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // An error page (404/500) is not always JSON, so never let parsing throw.
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ?? `Could not publish the job (HTTP ${response.status}).`,
    );
  }

  return result as CreateJobResponse;
};

export const deleteJob = async (jobId: string) => {
  const response = await fetch(`${BASE_URI}/jobs/${jobId}`, {
    method: 'DELETE', 
  }); 
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.message ?? `Failed to delete job (HTTP ${response.status})`);
  }
  return result; 
}; 
