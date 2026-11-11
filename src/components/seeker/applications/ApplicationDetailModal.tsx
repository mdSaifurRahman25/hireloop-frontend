"use client";

import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import type { ApplicationItem } from "@/types";
import { JobRoleIcon } from "./JobRoleIcon";
import { StatusBadge } from "./StatusBadge";

interface ApplicationDetailModalProps {
  application: ApplicationItem | null;
  onClose: () => void;
}

export function ApplicationDetailModal({
  application,
  onClose,
}: ApplicationDetailModalProps) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3.5 sm:p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#141414] p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <JobRoleIcon type={application.iconType} />
            <div className="min-w-0">
              <h3 className="truncate text-base sm:text-lg font-bold text-white">
                {application.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {application.company}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-zinc-400 hover:text-white shrink-0"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body Details */}
        <div className="mt-4 space-y-4">
          {/* Status and Applied Time */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="text-xs text-zinc-400">Current Status</span>
            <StatusBadge status={application.status} />
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                Work Mode
              </span>
              <p className="mt-1 font-medium text-white">
                {application.type} • {application.workMode}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                Applied Date
              </span>
              <p className="mt-1 font-medium text-white">
                {application.appliedDate}
              </p>
            </div>
            {application.salary && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                  Compensation
                </span>
                <p className="mt-1 font-medium text-white truncate">
                  {application.salary}
                </p>
              </div>
            )}
            {application.location && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                  Location
                </span>
                <p className="mt-1 font-medium text-white truncate">
                  {application.location}
                </p>
              </div>
            )}
          </div>

          {/* Candidate Submission Info */}
          {(application.applicantName || application.applicantEmail) && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2 text-xs">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                Application Information
              </span>
              {application.applicantName && (
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">Applicant:</span>
                  <span className="font-medium text-white">
                    {application.applicantName}
                  </span>
                </div>
              )}
              {application.applicantEmail && (
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">Email:</span>
                  <span className="font-medium text-white">
                    {application.applicantEmail}
                  </span>
                </div>
              )}
              {application.portfolioUrl && (
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">Portfolio:</span>
                  <a
                    href={application.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-indigo-400 hover:text-indigo-300 truncate max-w-[200px]"
                  >
                    {application.portfolioUrl}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5"
          >
            Close
          </button>
          {application.jobId && (
            <Link
              href={`/browse-jobs/${application.jobId}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              <ExternalLink className="size-3.5" />
              View Job Listing
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
