import type { JobDocument } from "@/types";

export type { JobDocument };

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

/**
 * Reads every job post from the API.
 *
 * This is only called from a Server Component. Running it on the server means
 * the request happens once per page render instead of once per client render,
 * so there is no render/fetch loop in the browser.
 */
export const getJobs = async (): Promise<JobDocument[]> => {
  const res = await fetch(`${BASE_URI}/jobs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GET /jobs failed with status ${res.status}`);
  }

  return res.json();
};

export const getJobById = async (id: string): Promise<JobDocument> => {
  const res = await fetch(`${BASE_URI}/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GET /jobs/${id} failed with status ${res.status}`);
  }

  return res.json();
};
