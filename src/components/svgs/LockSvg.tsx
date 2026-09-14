export default function LockSvg({
  className,
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`svg svg-lock ${className}`}
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g transform="scale(0.8) translate(3 3)">
        <rect
          height="10"
          rx="2"
          ry="2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          width="16"
          x="4"
          y="11"
        />
        <path
          d="M16.5 11V8c0-2.8-.5-5-4.5-5S7.5 5.2 7.5 8v3"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}
