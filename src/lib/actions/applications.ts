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

/**
 * Fetches the total count of applications for a given applicant.
 * Uses the backend GET /applications/count endpoint powered by MongoDB countDocuments.
 * Includes a resilient fallback to /applications?email=... if needed.
 */
export const getApplicationsCount = async (
  params?: string | { applicantId?: string; email?: string },
): Promise<number> => {
  let userEmail: string | undefined;
  let applicantId: string | undefined;

  if (typeof params === "string" && params.trim()) {
    if (params.includes("@")) {
      userEmail = params.trim();
    } else {
      applicantId = params.trim();
    }
  } else if (params && typeof params === "object") {
    userEmail = params.email?.trim();
    applicantId = params.applicantId?.trim();
  }

  const searchParams = new URLSearchParams();
  if (applicantId) searchParams.set("applicantId", applicantId);
  if (userEmail) searchParams.set("email", userEmail);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

  try {
    const response = await fetch(`${BASE_URI}/applications/count${query}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      if (typeof data?.count === "number" && data.count > 0) {
        return data.count;
      }
    }
  } catch (err) {
    console.error("GET /applications/count fetch error:", err);
  }

  // Fallback: If backend count returned 0 or server in-memory process needs reload,
  // query /applications?email=... to count verified applications directly
  if (userEmail) {
    try {
      const liveApps = await getApplications({ email: userEmail });
      if (Array.isArray(liveApps) && liveApps.length > 0) {
        return liveApps.length;
      }
    } catch (fallbackErr) {
      console.error("Fallback getApplications count failed:", fallbackErr);
    }
  }

  return 0;
};

export default applyToJob;
