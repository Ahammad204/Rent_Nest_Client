"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Check,
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
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../_actions/dashboardActions";

interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count?: { properties: number };
}

interface CategoriesTableProps {
  categories: Category[];
}

const PAGE_SIZE = 10;

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [localCategories, setLocalCategories] =
    useState<Category[]>(categories);
  const [processing, setProcessing] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase();
    return localCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)),
    );
  }, [localCategories, search]);

  const totalPages = Math.ceil(filteredCategories.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const handleAdd = async () => {
    if (!newName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setAdding(true);
    try {
      const result = await createCategory({
        name: newName.trim(),
        description: newDescription.trim() || undefined,
      });

      if (result.success) {
        toast.success("Category created");
        setLocalCategories((prev) => [result.data, ...prev]);
        setNewName("");
        setNewDescription("");
        setShowAddForm(false);
      } else {
        toast.error(result.message || "Failed to create category");
      }
    } catch {
      toast.error("Failed to create category");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setProcessing((prev) => new Set(prev).add(id));
    try {
      const result = await updateCategory(id, {
        name: editName.trim(),
        description: editDescription.trim() || undefined,
      });

      if (result.success) {
        toast.success("Category updated");
        setLocalCategories((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  name: editName.trim(),
                  description: editDescription.trim() || null,
                }
              : c,
          ),
        );
        setEditingId(null);
      } else {
        toast.error(result.message || "Failed to update category");
      }
    } catch {
      toast.error("Failed to update category");
    } finally {
      setProcessing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleDelete = async (category: Category) => {
    setProcessing((prev) => new Set(prev).add(category.id));
    try {
      const result = await deleteCategory(category.id);

      if (result.success) {
        toast.success("Category deleted");
        setLocalCategories((prev) => prev.filter((c) => c.id !== category.id));
        setDeleteTarget(null);
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setProcessing((prev) => {
        const next = new Set(prev);
        next.delete(category.id);
        return next;
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search + Add */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold bg-primary text-white rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={adding}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-primary text-white rounded hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50"
            >
              {adding ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              {adding ? "Adding..." : "Add"}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewName("");
                setNewDescription("");
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-border rounded hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-border bg-[background]">
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Description
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Properties
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Created
              </th>
              <th className="text-right px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              paginatedCategories.map((category) => {
                const isEditing = editingId === category.id;
                const isProcessing = processing.has(category.id);

                return (
                  <tr
                    key={category.id}
                    className="border-b border-[background] last:border-0"
                  >
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <span className="font-medium text-foreground">
                          {category.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-2 py-1 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:border-primary"
                          placeholder="Description"
                        />
                      ) : (
                        <span className="text-muted-foreground">
                          {category.description || "—"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-primary/10 text-primary">
                        {category._count?.properties || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isEditing ? (
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => handleUpdate(category.id)}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded transition-colors cursor-pointer disabled:opacity-50 dark:text-green-400 dark:bg-green-950 dark:hover:bg-green-900 dark:border-green-800"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-muted-foreground bg-muted hover:bg-muted/80 border border-border rounded transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => {
                              setEditingId(category.id);
                              setEditName(category.name);
                              setEditDescription(category.description || "");
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors cursor-pointer dark:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-800"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(category)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors cursor-pointer dark:text-red-400 dark:bg-red-950 dark:hover:bg-red-900 dark:border-red-800"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
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
          <p className="text-xs text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGE_SIZE, filteredCategories.length)} of{" "}
            {filteredCategories.length} categories
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground">
              Delete Category
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  handleDelete(deleteTarget);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              YES, DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
