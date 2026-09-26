import { Link } from "@/i18n/navigation";

type LocalizedLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink(props: LocalizedLinkProps) {
  return <Link {...props} />;
}
