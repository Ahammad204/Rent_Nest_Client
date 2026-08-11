"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "../../_components/StatusBadge";

interface Rental {
  id: string;
  status: string;
  createdAt: string;
  tenant: { name: string; email: string };
  property: { title: string; location: string };
}

interface RentalsTableProps {
  rentals: Rental[];
}

const PAGE_SIZE = 10;

export function RentalsTable({ rentals }: RentalsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRentals = useMemo(() => {
    const q = search.toLowerCase();
    return rentals.filter(
      (r) =>
        (r.tenant.name.toLowerCase().includes(q) ||
          r.property.title.toLowerCase().includes(q)) &&
        (statusFilter === "ALL" || r.status === statusFilter),
    );
  }, [rentals, search, statusFilter]);

  const totalPages = Math.ceil(filteredRentals.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRentals = filteredRentals.slice(
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
            placeholder="Search by tenant or property..."
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
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
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
                Tenant
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
            {paginatedRentals.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No rental requests found.
                </td>
              </tr>
            ) : (
              paginatedRentals.map((rental) => (
                <tr
                  key={rental.id}
                  className="border-b border-[background] last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">
                      {rental.property.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rental.property.location}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-foreground">{rental.tenant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {rental.tenant.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={rental.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(rental.createdAt).toLocaleDateString()}
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
            {Math.min(startIndex + PAGE_SIZE, filteredRentals.length)} of{" "}
            {filteredRentals.length} rentals
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