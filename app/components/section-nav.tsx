import { NavLink } from "react-router";
import { links } from "@/components/site-header";

export function SectionNav({ className }: { className: string }) {
  return (
    <nav className={className} aria-label="Разделы сайта">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
      ))}
    </nav>
  );
}
