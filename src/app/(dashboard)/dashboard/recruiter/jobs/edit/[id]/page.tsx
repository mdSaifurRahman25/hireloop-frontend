"use client";

import { use, Suspense } from "react";
import { EditJobContent } from "../page";
import { Loader2 } from "lucide-react";

export default function EditJobByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1080px] py-16 text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-indigo-500" />
          <p className="mt-3 text-sm text-zinc-400">Loading editor...</p>
        </div>
      }
    >
      <EditJobContent explicitId={resolvedParams.id} />
    </Suspense>
  );
}
