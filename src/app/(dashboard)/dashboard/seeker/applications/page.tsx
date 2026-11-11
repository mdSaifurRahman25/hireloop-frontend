"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { getApplications } from "@/lib/actions/applications";
import type {
  ApplicationIconType,
  ApplicationItem,
  ApplicationMetrics,
  ApplicationStatus,
  JobApplicationDocument,
} from "@/types";
import {
  ApplicationDetailModal,
  ApplicationPagination,
  ApplicationStatCards,
  ApplicationTable,
  ApplicationToolbar,
} from "@/components/seeker/applications";

function formatTimelineDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${Math.max(1, diffMins)}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ApplicationsContent() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabFilter, setTabFilter] = useState<"Active" | "Archived">("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const { data: session } = useSession();
  const user = session?.user;

  // Fetch real applications directly from backend (MongoDB)
  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const userEmail = user?.email;
        const liveDocs = await getApplications(
          userEmail ? { email: userEmail } : undefined,
        );

        if (isMounted) {
          const mapped: ApplicationItem[] = (liveDocs || []).map(
            (doc: JobApplicationDocument, idx: number) => {
              const appliedDate = doc.appliedAt
                ? formatTimelineDate(doc.appliedAt)
                : "Recently";

              const lowerTitle = (doc.jobTitle || "").toLowerCase();
              let iconType: ApplicationIconType = "general";
              if (
                lowerTitle.includes("frontend") ||
                lowerTitle.includes("developer") ||
                lowerTitle.includes("software") ||
                lowerTitle.includes("engineer")
              ) {
                iconType = "code";
              } else if (
                lowerTitle.includes("designer") ||
                lowerTitle.includes("ui") ||
                lowerTitle.includes("ux")
              ) {
                iconType = "design";
              } else if (
                lowerTitle.includes("data") ||
                lowerTitle.includes("scientist") ||
                lowerTitle.includes("analyst")
              ) {
                iconType = "data";
              } else if (
                lowerTitle.includes("cloud") ||
                lowerTitle.includes("devops")
              ) {
                iconType = "cloud";
              } else if (
                lowerTitle.includes("ai") ||
                lowerTitle.includes("machine learning")
              ) {
                iconType = "ai";
              }

              // Normalize status
              let status: ApplicationStatus = "Applied";
              const rawStatus = (doc.status as string | undefined)?.toLowerCase();
              if (rawStatus === "review" || rawStatus === "reviewed") {
                status = "Review";
              } else if (rawStatus === "shortlisted") {
                status = "Shortlisted";
              } else if (rawStatus === "rejected") {
                status = "Rejected";
              } else if (rawStatus === "offered" || rawStatus === "accepted") {
                status = "Offered";
              }

              return {
                id: doc._id || `app-${idx}`,
                jobId: doc.jobId,
                title: doc.jobTitle || "Job Position",
                type: "Full-time",
                workMode: doc.location?.toLowerCase().includes("remote")
                  ? "Remote"
                  : "On-site",
                company: doc.companyName || "Hireloop Partner",
                appliedDate,
                status,
                iconType,
                salary: doc.salary,
                location: doc.location,
                applicantName: doc.applicantName,
                applicantEmail: doc.applicantEmail,
                portfolioUrl: doc.portfolioUrl,
                appliedAt: doc.appliedAt,
              };
            },
          );

          setApplications(mapped);
        }
      } catch (error) {
        console.error("Failed to load applications from backend:", error);
        if (isMounted) {
          setApplications([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  // Filter based on Tab (Active vs Archived) and Search Query
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Tab filter: Active shows non-rejected, Archived shows rejected
      if (tabFilter === "Active") {
        if (app.status === "Rejected") return false;
      } else {
        if (app.status !== "Rejected") return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          app.title.toLowerCase().includes(query) ||
          app.company.toLowerCase().includes(query) ||
          (app.location && app.location.toLowerCase().includes(query)) ||
          app.status.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [applications, tabFilter, searchQuery]);

  // Dynamic Metrics derived directly from real backend applications
  const metrics: ApplicationMetrics = useMemo(() => {
    const totalApplied = applications.length;
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
    const interviews = applications.filter(
      (a) => a.status === "Review" || a.status === "Shortlisted",
    ).length;
    const offered = applications.filter((a) => a.status === "Offered").length;
    const successRate =
      totalApplied > 0 ? Math.round((offered / totalApplied) * 100) : 0;

    return {
      totalApplied,
      shortlisted,
      interviews,
      successRate: `${successRate}%`,
    };
  }, [applications]);

  // Pagination (5 items per page)
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApplications.slice(start, start + pageSize);
  }, [filteredApplications, currentPage]);

  const handleExportPDF = () => {
    toast.add({
      title: "Preparing Export",
      description: "Opening print/export dialogue for your applications...",
    });
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Search, User Profile, Tabs & PDF Export */}
      <ApplicationToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        tabFilter={tabFilter}
        onTabFilterChange={(tab) => {
          setTabFilter(tab);
          setCurrentPage(1);
        }}
        onExportPDF={handleExportPDF}
        user={user}
      />

      {/* 2. Dynamic Metric Stat Cards */}
      <ApplicationStatCards metrics={metrics} isLoading={isLoading} />

      {/* 3. Responsive Applications Table / Cards */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212]">
        <ApplicationTable
          applications={paginatedApplications}
          totalCount={applications.length}
          isLoading={isLoading}
          searchQuery={searchQuery}
          tabFilter={tabFilter}
          onSelectApp={setSelectedApp}
          onClearSearch={() => setSearchQuery("")}
          onShowActive={() => setTabFilter("Active")}
        />

        {/* 4. Pagination Controls */}
        {!isLoading && filteredApplications.length > 0 && (
          <ApplicationPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalFiltered={filteredApplications.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* 5. Detail View Dialog Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    </div>
  );
}

export default function SeekerApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-10 w-64 rounded-xl bg-white/10" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl border border-white/[0.08] bg-[#121212]"
              />
            ))}
          </div>
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
        </div>
      }
    >
      <ApplicationsContent />
    </Suspense>
  );
}
