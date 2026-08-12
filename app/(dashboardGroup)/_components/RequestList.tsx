"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { updateRentalRequestStatus } from "../_actions/dashboardActions";

interface Request {
  id: string;
  status: string;
  message: string | null;
  moveInDate: string | null;
  createdAt: string;
  tenant: { id: string; name: string; email: string };
  property: { id: string; title: string; location: string };
}

interface RequestListProps {
  requests: Request[];
}

export function RequestList({ requests }: RequestListProps) {
  const [localRequests, setLocalRequests] = useState<Map<string, string>>(
    () => new Map(requests.map((r) => [r.id, r.status])),
  );
  const [processing, setProcessing] = useState<Map<string, boolean>>(
    () => new Map(),
  );

  const handleAction = async (
    requestId: string,
    newStatus: "APPROVED" | "REJECTED",
  ) => {
    const previousStatus = localRequests.get(requestId) || "PENDING";

    // Optimistic update
    setLocalRequests((prev) => new Map(prev).set(requestId, newStatus));
    setProcessing((prev) => new Map(prev).set(requestId, true));

    try {
      const result = await updateRentalRequestStatus(requestId, newStatus);

      if (result.success) {
        toast.success(
          newStatus === "APPROVED"
            ? "Request approved successfully"
            : "Request rejected",
        );
      } else {
        // Revert
        setLocalRequests((prev) =>
          new Map(prev).set(requestId, previousStatus),
        );
        toast.error(result.message || "Failed to update request");
      }
    } catch {
      // Revert
      setLocalRequests((prev) => new Map(prev).set(requestId, previousStatus));
      toast.error("Failed to update request");
    } finally {
      setProcessing((prev) => {
        const next = new Map(prev);
        next.delete(requestId);
        return next;
      });
    }
  };

  const statusBadge = (status: string) => (
    <span
      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
        status === "ACTIVE"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : status === "APPROVED"
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            : status === "PENDING"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              : status === "REJECTED"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="space-y-3">
      {requests.map((request) => {
        const currentStatus = localRequests.get(request.id) || request.status;
        const isProcessing = processing.get(request.id) || false;
        const isPending = currentStatus === "PENDING";

        return (
          <div
            key={request.id}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className=" flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">
                  {request.property.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {request.property.location}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tenant: {request.tenant.name} ({request.tenant.email})
                </p>
                {request.moveInDate && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Move-in: {new Date(request.moveInDate).toLocaleDateString()}
                  </p>
                )}
                {request.message && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    `{request.message}`
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {statusBadge(currentStatus)}

                {isPending && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAction(request.id, "APPROVED")}
                      disabled={isProcessing}
                      className="p-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                      title="Approve"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-3 h-3 text-white animate-spin" />
                      ) : (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => handleAction(request.id, "REJECTED")}
                      disabled={isProcessing}
                      className="p-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                      title="Reject"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-3 h-3 text-white animate-spin" />
                      ) : (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
