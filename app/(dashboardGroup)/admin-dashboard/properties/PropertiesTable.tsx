"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "../../_components/StatusBadge";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  propertyType: string;
  landlord: { name: string };
}

interface PropertiesTableProps {
  properties: Property[];
}

const PAGE_SIZE = 10;

export function PropertiesTable({ properties }: PropertiesTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProperties = useMemo(() => {
    const q = search.toLowerCase();
    return properties.filter(
      (p) =>
        (p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)) &&
        (statusFilter === "ALL" || p.status === statusFilter),
    );
  }, [properties, search, statusFilter]);

  const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProperties = filteredProperties.slice(
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
            placeholder="Search by title or location..."
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
          <option value="AVAILABLE">Available</option>
          <option value="RENTED">Rented</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-border bg-[background]">
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Title
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Landlord
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProperties.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No properties found.
                </td>
              </tr>
            ) : (
              paginatedProperties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-[background] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {property.title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {property.location}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    ৳{property.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-primary/10 text-primary">
                      {property.propertyType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {property.landlord.name}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={property.status} />
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
            {Math.min(startIndex + PAGE_SIZE, filteredProperties.length)} of{" "}
            {filteredProperties.length} properties
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