const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

/**
 * A job document as stored in MongoDB. The collection is not uniform yet:
 * older rows use `title` / `frequency` while newer ones use `jobTitle` /
 * `salaryFrequency`, so the optional fields cover both shapes.
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
  createdAt?: string | null;
};

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
