"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldBan,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { banUnbanUser } from "../_actions/dashboardActions";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UserManagementTableProps {
  users: User[];
}

const PAGE_SIZE = 10;

export function UserManagementTable({ users }: UserManagementTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [localUsers, setLocalUsers] = useState<Map<string, string>>(
    () => new Map(users.map((u) => [u.id, u.status])),
  );
  const [processing, setProcessing] = useState<Set<string>>(new Set());
  const [banTarget, setBanTarget] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);

  const handleBanUnban = async (user: User, newStatus: "ACTIVE" | "BANNED") => {
    const previousStatus = localUsers.get(user.id) || user.status;

    setLocalUsers((prev) => new Map(prev).set(user.id, newStatus));
    setProcessing((prev) => new Set(prev).add(user.id));

    try {
      const result = await banUnbanUser(user.id, newStatus);

      if (result.success) {
        toast.success(
          newStatus === "BANNED"
            ? `${user.name} has been banned`
            : `${user.name} has been unbanned`,
        );
      } else {
        setLocalUsers((prev) => new Map(prev).set(user.id, previousStatus));
        toast.error(result.message || "Failed to update user");
      }
    } catch {
      setLocalUsers((prev) => new Map(prev).set(user.id, previousStatus));
      toast.error("Failed to update user");
    } finally {
      setProcessing((prev) => {
        const next = new Set(prev);
        next.delete(user.id);
        return next;
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8DBD3] bg-[#F4F5F1]">
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Joined
              </th>
              <th className="text-right px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const currentStatus = localUsers.get(user.id) || user.status;
                const isProcessing = processing.has(user.id);
                const isBanned = currentStatus === "BANNED";
                const isAdmin = user.role === "ADMIN";

                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#F4F5F1] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-[#1B211E]">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#1F4D3E]/10 text-[#1F4D3E]">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          currentStatus === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isAdmin ? (
                        isBanned ? (
                          <button
                            onClick={() => handleBanUnban(user, "ACTIVE")}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <ShieldCheck className="w-3 h-3" />
                            )}
                            Unban
                          </button>
                        ) : (
                          <button
                            onClick={() => setBanTarget(user)}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <ShieldBan className="w-3 h-3" />
                            )}
                            Ban
                          </button>
                        )
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGE_SIZE, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-[#D8DBD3] rounded hover:bg-[#F4F5F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-[#D8DBD3] rounded hover:bg-[#F4F5F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Ban Confirmation Dialog */}
      <AlertDialog open={!!banTarget} onOpenChange={(open) => !open && setBanTarget(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-[#1B211E]">
              Ban User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Are you sure you want to ban <strong>{banTarget?.name}</strong>?
              They will no longer be able to access the platform. This action can
              be reversed by unbanning them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (banTarget) {
                  handleBanUnban(banTarget, "BANNED");
                  setBanTarget(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              YES, BAN USER
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}