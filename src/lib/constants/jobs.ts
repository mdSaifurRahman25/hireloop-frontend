export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
] as const;

export const BROWSE_JOB_TYPES = [
  "All",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
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

export const SALARY_RANGES = [
  { id: "All", label: "All Salaries" },
  { id: "0-50", label: "Under $50k" },
  { id: "50-100", label: "$50k - $100k" },
  { id: "100-150", label: "$100k - $150k" },
  { id: "150+", label: "$150k+" },
] as const;

export const SORT_OPTIONS = [
  "Most Recent",
  "Highest Salary",
  "Full-time First",
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
