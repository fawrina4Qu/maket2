import { useEffect, useState } from "react";
import { signOut, useSession } from "@agent-native/core/client/hooks";
import { IconArrowRight, IconHeart, IconLogout2, IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import { Link, NavLink, useLocation } from "react-router";
import { setFavoritesPanelOpen, useFavoritesPanelOpen } from "@/lib/favorites-store";
import { searchSite } from "@/lib/search";

const links = [
  { label: "Новинки", to: "/new" },
  { label: "Интерактивная карта", to: "/map" },
  { label: "Лекции", to: "/lectures" },
  { label: "Ключевые эпохи", to: "/eras" },
  { label: "О нас", to: "/about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { session } = useSession();
  const { pathname } = useLocation();
  const favoritesOpen = useFavoritesPanelOpen();
  const results = searchSite(query);

  useEffect(() => {
    setFavoritesPanelOpen(false);
  }, [pathname]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function toggleFavorites() {
    setFavoritesPanelOpen(!favoritesOpen);
  }

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
          <div className="header-search">
            {searchOpen && (
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Escape" && closeSearch()}
                placeholder="Поиск"
                aria-label="Поиск по сайту"
              />
            )}
            {searchOpen && query.trim() && (
              <div className="header-search-results">
                {results.length === 0 ? <p className="header-search-empty">Ничего не найдено</p> : results.map((result) => (
                  <Link key={result.key} to={result.to} onClick={closeSearch}>
                    {result.title}
                    <span>{result.subtitle}</span>
                  </Link>
                ))}
              </div>
            )}
            <button onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))} aria-label={searchOpen ? "Закрыть поиск" : "Открыть поиск"} aria-expanded={searchOpen}>
              {searchOpen ? <IconX /> : <IconSearch />}
            </button>
          </div>
          {session && (
            <button className={favoritesOpen ? "header-favorites is-active" : "header-favorites"} onClick={toggleFavorites} aria-label="Понравившиеся лекции" aria-pressed={favoritesOpen}>
              <IconHeart />
            </button>
          )}
          {session ? <button aria-label="Выйти из аккаунта" title={session.name ? `Выйти, ${session.name}` : "Выйти из аккаунта"} onClick={() => void signOut({ redirectTo: "/" })}><IconLogout2 /></button> : <NavLink className="header-login" to="/login" title="Войти">Войти</NavLink>}
        </div>
      </header>
    </>
  );
}
