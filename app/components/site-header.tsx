import { useState } from "react";
import { signOut, useSession } from "@agent-native/core/client/hooks";
import { IconArrowRight, IconHeart, IconLogout2, IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import { NavLink } from "react-router";

const links = [
  { label: "Новинки", to: "/new" },
  { label: "Курсы", to: "/favorites" },
  { label: "Лекции", to: "/lectures" },
  { label: "Ключевые эпохи", to: "/eras" },
  { label: "О нас", to: "/about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session } = useSession();

  return (
    <>
      <div className="topline">Первая лекция бесплатно <span>✦</span> Скидка 10% на первый курс по промокоду <strong>BLOOMHISTORY</strong></div>
      <header className="site-header">
        <NavLink to="/" className="brand site-name" aria-label="История России для чайников — главная">
          <span className="brand-mark">✿</span><span>История России <i>для чайников</i></span>
        </NavLink>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen}>
          {menuOpen ? <IconX /> : <IconMenu2 />}
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}{link.label === "Курсы" && <IconArrowRight size={13} />}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <NavLink to="/lectures" aria-label="Открыть лекции"><IconSearch /></NavLink>
          <NavLink to="/favorites" aria-label="Любимые курсы"><IconHeart /></NavLink>
          {session ? <button aria-label="Выйти из аккаунта" title={session.name ? `Выйти, ${session.name}` : "Выйти из аккаунта"} onClick={() => void signOut({ redirectTo: "/" })}><IconLogout2 /></button> : <NavLink className="header-login" to="/login">Войти</NavLink>}
        </div>
      </header>
    </>
  );
}
