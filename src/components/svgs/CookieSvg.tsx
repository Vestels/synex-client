export default function CookieSvg({
  className,
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`svg svg-cookie ${className}`}
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2a10 10 0 1 0 10 10c0-1.82-1.04-3.4-2.57-4.18A3.5 3.5 0 0 1 15 5c0-1.53-.98-2.84-2.35-3.32A9.87 9.87 0 0 0 12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="9" r="1.25" fill={color} />
      <circle cx="7.5" cy="14.5" r="1.25" fill={color} />
      <circle cx="12.5" cy="16" r="1.25" fill={color} />
      <circle cx="15.5" cy="11.5" r="1.25" fill={color} />
    </svg>
  );
}
