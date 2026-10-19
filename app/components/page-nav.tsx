import { NavLink } from "react-router";

const links = [
  { label: "Новинки", to: "/new" },
  { label: "Интерактивная карта", to: "/map" },
  { label: "Лекции", to: "/lectures" },
  { label: "Ключевые эпохи", to: "/eras" },
  { label: "О нас", to: "/about" },
];

export function PageNav() {
  return (
    <nav className="section-wrap page-nav" aria-label="Основная навигация">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
      ))}
    </nav>
  );
}
