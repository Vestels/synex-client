export default function SpinnerSvg({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      className={`spinner ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="3" opacity="0.2" />
      <path d="M21 12a9 9 0 0 1-9 9" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
