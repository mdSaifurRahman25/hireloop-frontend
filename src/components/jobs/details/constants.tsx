import {
  Code2,
  Coins,
  Infinity as InfinityIcon,
  Laptop,
  Network,
  Palette,
  PenTool,
  ShieldCheck,
} from "lucide-react";

export type SkillIconType = "figma" | "system" | "uiux" | "frontend";
export type BenefitIconType = "health" | "401k" | "hardware" | "pto";

export const CATEGORY_SKILLS: Record<
  string,
  { label: string; icon: SkillIconType }[]
> = {
  "Engineering & Tech": [
    { label: "Software Architecture", icon: "system" },
    { label: "Code Quality & Testing", icon: "frontend" },
    { label: "API Design", icon: "system" },
    { label: "Modern Stack", icon: "frontend" },
  ],
  Design: [
    { label: "UI/UX Design", icon: "uiux" },
    { label: "Figma Systems", icon: "figma" },
    { label: "User Research", icon: "system" },
    { label: "Prototyping", icon: "uiux" },
  ],
  Product: [
    { label: "Product Roadmap", icon: "system" },
    { label: "User Journey", icon: "uiux" },
    { label: "Sprint Planning", icon: "frontend" },
    { label: "Data Analytics", icon: "system" },
  ],
  Marketing: [
    { label: "Growth Strategy", icon: "system" },
    { label: "Content Marketing", icon: "uiux" },
    { label: "SEO & SEM", icon: "frontend" },
    { label: "Campaign Analytics", icon: "system" },
  ],
  Sales: [
    { label: "B2B Sales", icon: "system" },
    { label: "Pipeline Management", icon: "frontend" },
    { label: "Negotiation", icon: "system" },
    { label: "Client Success", icon: "uiux" },
  ],
  Operations: [
    { label: "Process Optimization", icon: "system" },
    { label: "Cross-team Delivery", icon: "frontend" },
    { label: "Operational Scaling", icon: "system" },
    { label: "Resource Planning", icon: "uiux" },
  ],
  Finance: [
    { label: "Financial Modeling", icon: "system" },
    { label: "Budget Planning", icon: "system" },
    { label: "Reporting", icon: "frontend" },
    { label: "Compliance", icon: "system" },
  ],
  "Customer Support": [
    { label: "Customer Empathy", icon: "uiux" },
    { label: "Issue Resolution", icon: "system" },
    { label: "Documentation", icon: "frontend" },
    { label: "Communication", icon: "system" },
  ],
};

export const DEFAULT_BENEFITS: {
  label: string;
  icon: BenefitIconType;
}[] = [
  { label: "Full Health & Dental", icon: "health" },
  { label: "Competitive 401k / Pension", icon: "401k" },
  { label: "Latest Hardware Stipend", icon: "hardware" },
  { label: "Flexible Paid Time Off (PTO)", icon: "pto" },
];

export function SkillIcon({ type }: { type: SkillIconType }) {
  if (type === "figma") {
    return <PenTool aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  if (type === "system") {
    return <Network aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  if (type === "uiux") {
    return <Palette aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  return <Code2 aria-hidden="true" className="size-3.5 text-zinc-400" />;
}

export function BenefitIcon({ type }: { type: BenefitIconType }) {
  if (type === "health") {
    return <ShieldCheck aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  if (type === "401k") {
    return <Coins aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  if (type === "hardware") {
    return <Laptop aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  return <InfinityIcon aria-hidden="true" className="size-4 text-zinc-300" />;
}
