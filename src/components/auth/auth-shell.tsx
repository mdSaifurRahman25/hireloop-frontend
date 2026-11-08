import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-12 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/2 h-[340px] w-[560px] -translate-x-1/2 rounded-full bg-orange-500/[0.07] blur-[130px]" />
      </div>

      <div className="relative w-full max-w-[440px]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthShell;
