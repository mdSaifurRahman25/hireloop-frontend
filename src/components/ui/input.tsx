import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors",
        "placeholder:text-zinc-500",
        "focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500/60 aria-invalid:ring-2 aria-invalid:ring-red-500/15",
        className
      )}
      {...props}
    />
  )
}

export { Input }
