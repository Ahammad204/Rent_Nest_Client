"use client";

import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Error</h2>
      <p className="text-gray-600 max-w-md">
        {error.message ||
          "Something went wrong while loading the dashboard. Please try again."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
