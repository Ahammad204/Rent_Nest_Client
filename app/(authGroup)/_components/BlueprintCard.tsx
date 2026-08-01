import type { ReactNode } from "react";

interface BlueprintCardProps {
  children: ReactNode;
  className?: string;
  accentTick?: boolean;
}

export function BlueprintCard({
  children,
  className = "",
  accentTick = false,
}: BlueprintCardProps) {
  const tickColor = accentTick ? "text-[#C98A2C]" : "text-[#1F4D3E]";

  const tickClassName = `absolute w-3.5 h-3.5 ${tickColor} pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity`;

  return (
    <div
      className={`group relative bg-white border border-[#D8DBD3] rounded-md transition-all duration-200 hover:border-[#1F4D3E] ${className}`}
    >
      {/* Top Left */}
      <svg
        className={`${tickClassName} top-1 left-1`}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 0V8M0 0H8" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Top Right */}
      <svg
        className={`${tickClassName} top-1 right-1`}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M14 0V8M14 0H6" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Bottom Left */}
      <svg
        className={`${tickClassName} bottom-1 left-1`}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 14V6M0 14H8" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Bottom Right */}
      <svg
        className={`${tickClassName} bottom-1 right-1`}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M14 14V6M14 14H6" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {children}
    </div>
  );
}
