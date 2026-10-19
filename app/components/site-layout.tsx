import { useState, type FormEvent, type ReactNode } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link, NavLink } from "react-router";
import { FavoritesOverlay } from "@/components/favorites-overlay";
import { FeedbackDialog, NewsletterDialog } from "@/components/footer-dialogs";
import { HistoryTiles } from "@/components/history-tiles";
import { SiteHeader } from "@/components/site-header";
function scrollPageToTop() {
  const scroller: Element | Window = document.querySelector(".agent-native-app-main") ?? window;
  scroller.scrollTo({ top: 0, behavior: "smooth" });
}

export function SiteLayout({ children, showCommunity = true, showFooter = true }: { children: ReactNode; showCommunity?: boolean; showFooter?: boolean }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterOpen(true);
    setSubscriberEmail("");
  }

  return (
    <div className="blossom-site">
      <SiteHeader />
      <FavoritesOverlay />
      <main className="site-page-content">{children}</main>
      {showCommunity && <section className="community section-wrap">
        <div className="section-heading">
          <div><p className="eyebrow">МЫ УЧИМСЯ ВМЕСТЕ</p><h2>История России <em>для чайников</em></h2><p className="section-sub">История становится ближе, когда ей делятся.</p></div>
          <div className="community-actions"><Link className="community-home-link" to="/" aria-label="Вернуться на главную"><IconArrowLeft size={16} /> На главную</Link></div>
        </div>
        <HistoryTiles />
      </section>}
      {showFooter && <footer className="site-footer" id="footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand"><NavLink to="/" className="brand site-name"><span className="brand-mark">✿</span><span>История России <i>для чайников</i></span></NavLink><p>История в розовом свете.</p><span className="footer-copyright">© 2025 ИСТОРИЯ РОССИИ</span></div>
          <div className="footer-column"><h3>Контакты</h3><p>+7 (495) 318-27-64</p><p>hello@istoriya-chaynikov.ru</p><p>Москва, ул. Лесная, 14, оф. 302</p><button type="button" className="footer-column-button" onClick={() => setFeedbackOpen(true)}>Обратная связь</button></div>
          <div className="footer-newsletter"><h3>Письма с историей</h3><p>Красивые открытия и новые лекции — раз в неделю.</p><form onSubmit={handleNewsletterSubmit}><input type="email" required placeholder="Ваш email" aria-label="Ваш email" value={subscriberEmail} onChange={(event) => setSubscriberEmail(event.target.value)} /><button type="submit" aria-label="Подписаться"><IconArrowRight /></button></form><small>Подписываясь, вы соглашаетесь с политикой конфиденциальности.</small></div>
        </div>
        <div className="footer-bottom section-wrap"><span>СОЗДАНО С ЛЮБОВЬЮ К ИСТОРИИ</span><span>МОСКВА · ВЕЗДЕ</span><Link to="/" onClick={(event) => { event.preventDefault(); scrollPageToTop(); }}>НАВЕРХ ↑</Link></div>
        <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
        <NewsletterDialog open={newsletterOpen} onOpenChange={setNewsletterOpen} />
      </footer>}
    </div>
  );
}
