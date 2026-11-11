import type { BrowseJobsResponse, JobDocument } from "@/types";

export type { BrowseJobsResponse, JobDocument };

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

/**
 * Reads job posts from the API.
 * Handles both plain array and paginated/wrapped responses safely.
 */
export const getJobs = async (
  params?: Record<string, string | number>,
): Promise<JobDocument[]> => {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });
  }
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const res = await fetch(`${BASE_URI}/jobs${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GET /jobs failed with status ${res.status}`);
  }

  const data = await res.json();
  if (Array.isArray(data)) return data;
  return data.jobs ?? [];
};

/**
 * Fetches browsable jobs with total count, pagination, and category/type counts.
 */
export const getBrowseJobs = async (
  params?: Record<string, string | number>,
): Promise<BrowseJobsResponse> => {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });
  }
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const res = await fetch(`${BASE_URI}/jobs${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GET /jobs failed with status ${res.status}`);
  }

  const data = await res.json();
  if (Array.isArray(data)) {
    return {
      jobs: data,
      total: data.length,
      page: 1,
      limit: data.length,
      totalPages: 1,
    };
  }

  return data as BrowseJobsResponse;
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
