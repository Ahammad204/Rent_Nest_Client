const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  RENTED: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${style}`}
    >
      {status}
    </span>
  );
}