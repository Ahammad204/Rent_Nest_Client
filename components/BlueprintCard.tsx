import React from "react";

interface BlueprintCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentTick?: boolean;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  children,
  className = "",
  onClick,
  accentTick = false,
}) => {
  const tickColor = accentTick ? "text-secondary" : "text-primary";

  return (
    <div
      onClick={onClick}
      className={`group relative bg-card border border-border rounded-lg transition-all duration-200 hover:border-primary ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <svg
        className={`absolute top-1 left-1 w-3.5 h-3.5 ${tickColor} pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity`}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0V8M0 0H8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className={`absolute top-1 right-1 w-3.5 h-3.5 ${tickColor} pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity`}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 0V8M14 0H6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className={`absolute bottom-1 left-1 w-3.5 h-3.5 ${tickColor} pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity`}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 14V6M0 14H8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className={`absolute bottom-1 right-1 w-3.5 h-3.5 ${tickColor} pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity`}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 14V6M14 14H6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
};
