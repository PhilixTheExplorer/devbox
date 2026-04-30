import { ContributeIcon, SponsorIcon, StarIcon } from "@/components/icons";
import { OSS_SUPPORT_LINKS, type OssSupportId } from "@/config/site";

function getOssIcon(kind: OssSupportId) {
  if (kind === "star") return <StarIcon />;
  if (kind === "sponsor") return <SponsorIcon />;
  return <ContributeIcon />;
}

type SupportLinkProps = {
  kind: OssSupportId;
  href: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function SupportLink({
  kind,
  href,
  title,
  children,
  className = "text-[11px] px-2.5 py-1.5 leading-[1.25]",
}: SupportLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      className={`no-underline border border-border bg-surface text-muted2 rounded-sm inline-flex items-center gap-1.5 transition-all duration-150 hover:border-accent hover:bg-accent-dim hover:text-accent ${className}`}
    >
      {getOssIcon(kind)}
      {children}
    </a>
  );
}

type SupportLinksProps = {
  className?: string;
  variant?: "default" | "topbar";
};

export function SupportLinks({
  variant = "default",
  className,
}: SupportLinksProps) {
  if (variant === "topbar") {
    return (
      <div className={`flex gap-1.5 items-center ${className || ""}`}>
        {OSS_SUPPORT_LINKS.map((link) => (
          <SupportLink
            key={link.id}
            kind={link.id}
            href={link.href}
            title={link.title}
            className="h-[24px] justify-center text-[13px] w-[30px] p-0 lg:px-[9px] lg:py-[3px] lg:text-[10px] lg:w-auto lg:leading-none lg:gap-1"
          >
            <span className="hidden lg:inline">{link.label}</span>
          </SupportLink>
        ))}
      </div>
    );
  }

  return (
    <nav className={`flex flex-wrap gap-2 ${className || ""}`}>
      {OSS_SUPPORT_LINKS.map((link) => (
        <SupportLink
          key={link.id}
          kind={link.id}
          href={link.href}
          title={link.title}
        >
          {link.label}
        </SupportLink>
      ))}
    </nav>
  );
}
