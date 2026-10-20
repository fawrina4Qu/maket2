import type { ReactNode } from "react";

export function PageHeading({ eyebrow, title, children, afterCopy }: { eyebrow: string; title: ReactNode; children?: ReactNode; afterCopy?: ReactNode }) {
  return (
    <header className="page-heading section-wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <p className="page-heading-copy">{children}</p>}
      {afterCopy}
    </header>
  );
}
