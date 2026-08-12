"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  rentalRequest: {
    property: { title: string };
  };
}

interface PaymentsTableProps {
  payments: Payment[];
}

const PAGE_SIZE = 10;

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPayments = useMemo(() => {
    const q = search.toLowerCase();
    return payments.filter(
      (p) =>
        p.rentalRequest.property.title.toLowerCase().includes(q) &&
        (statusFilter === "ALL" || p.status === statusFilter),
    );
  }, [payments, search, statusFilter]);

  const totalPages = Math.ceil(filteredPayments.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search by property..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary"
        >
          <option value="ALL">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-border bg-[background]">
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Property
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Method
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[background] last:border-0"
                >
                  <td className="px-4 py-3 text-foreground">
                    {payment.rentalRequest.property.title}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    ৳{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground uppercase text-xs">
                    {payment.method}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        payment.status === "COMPLETED"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : payment.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGE_SIZE, filteredPayments.length)} of{" "}
            {filteredPayments.length} payments
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-border rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-border rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
