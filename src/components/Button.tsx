import LocalizedLink from "./LocalizedLink";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle" | "tertiary";
  disabled?: boolean;
  className?: string;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: () => void;
};

type Props = ButtonProps | LinkProps;

export default function Button({ children, variant = "primary", disabled = false, className, ...props }: Props) {
  const classes = ["button", `button--${variant}`, disabled && "button--disabled", className].filter(Boolean).join(" ");

  if ("href" in props && props.href !== undefined) {
    return (
      <LocalizedLink href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </LocalizedLink>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
