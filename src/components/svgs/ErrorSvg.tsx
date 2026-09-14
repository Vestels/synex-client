export default function ErrorSvg({
  className,
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`svg svg-error ${className}`}
      xmlns="http://w3.org"
      fill={color}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4.5c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5zm0 11c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75z" />
    </svg>
  );
}
