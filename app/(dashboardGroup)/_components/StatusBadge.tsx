const STATUS_STYLES: Record<string, string> = {
  AVAILABLE:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  RENTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  PENDING:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  APPROVED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ACTIVE:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  COMPLETED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style =
    STATUS_STYLES[status] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${style}`}
    >
      {status}
    </span>
  );
}
