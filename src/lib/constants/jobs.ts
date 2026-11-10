export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Customer Support",
] as const;

export const FREQUENCIES = [
  "per hour",
  "per day",
  "per month",
  "per year",
] as const;

export const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per month": "month",
  "per year": "yr",
};

export const DEFAULT_JOB_CATEGORY = "Engineering & Tech";
export const DEFAULT_JOB_TYPE = "Full-time";
export const DEFAULT_FREQUENCY = "per hour";
