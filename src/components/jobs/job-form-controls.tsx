import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export const inputIconClassName =
  "pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-500";

export function JobFieldLabel({
  htmlFor,
  id,
  children,
  required,
  hint,
}: {
  htmlFor?: string;
  id?: string;
  children: ReactNode;
  required?: boolean;
  hint?: ReactNode;
}) {
  const labelClassName = "text-sm font-medium text-zinc-200";
  const content = (
    <>
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-indigo-400">
          *
        </span>
      ) : null}
    </>
  );

  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      {htmlFor ? (
        <label htmlFor={htmlFor} className={labelClassName}>
          {content}
        </label>
      ) : (
        <span id={id} className={labelClassName}>
          {content}
        </span>
      )}
      {hint}
    </div>
  );
}

export function JobSectionHeading({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-[17px] font-semibold text-white">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
      <span>
        {step}. {children}
      </span>
    </h2>
  );
}

export function JobSelectField({
  id,
  name,
  options,
  value,
  defaultValue,
  onChange,
}: {
  id: string;
  name: string;
  options: readonly string[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-10 text-[15px] text-white outline-none transition-colors focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#141414] text-white"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-zinc-500" />
    </div>
  );
}
