import { useState, type ReactNode } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link, NavLink } from "react-router";
import { FeedbackDialog, MissionDialog } from "@/components/footer-dialogs";
import { SiteHeader } from "@/components/site-header";

export function SiteLayout({ children, showCommunity = true, showFooter = true }: { children: ReactNode; showCommunity?: boolean; showFooter?: boolean }) {
  const [missionOpen, setMissionOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="blossom-site">
      <SiteHeader />
      <main className="site-page-content">{children}</main>
      {showCommunity && <section className="community section-wrap" id="blossomhistory">
        <div className="section-heading">
          <div><p className="eyebrow">МЫ УЧИМСЯ ВМЕСТЕ</p><h2>#Blossom<em>History</em></h2><p className="section-sub">История становится ближе, когда ей делятся.</p></div>
          <div className="community-actions"><Link className="social-link" to="/#blossomhistory">@blossom_history <IconArrowRight size={16} /></Link><Link className="community-home-link" to="/" aria-label="Вернуться на главную"><IconArrowLeft size={16} /> На главную</Link></div>
        </div>
        <div className="community-grid">
          {[
            ["https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe1f7e4f697e64bbb904c6829025892b9?format=webp&width=800&height=1200", "Исторический коллаж о России"],
            ["https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F2d37afa7ae40414b95caac575b7c1764?format=webp&width=800&height=1200", "Исторический коллаж о России"],
            ["https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fceae985cd9f543bf8e982673ed3b5f4a?format=webp&width=800&height=1200", "Исторический коллаж о России"],
            ["https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe3998db7d3e04230b5f513ad49bfd32c?format=webp&width=800&height=1200", "Исторический коллаж о России"],
            ["https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F0cbb1b7069d242e58d0d90e669ec22c1?format=webp&width=800&height=1200", "Исторический коллаж о России"],
          ].map(([image, alt], index) => <Link className="community-tile" to="/" aria-label="Вернуться на главную" key={index}><img src={image} alt={alt} loading="lazy" /><span>✿</span></Link>)}
        </div>
      </section>}
      {showFooter && <footer className="site-footer" id="footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand"><NavLink to="/" className="brand site-name"><span className="brand-mark">✿</span><span>История России <i>для чайников</i></span></NavLink><p>История в розовом свете.</p><span className="footer-copyright">© 2025 ИСТОРИЯ РОССИИ</span></div>
          <div className="footer-column"><h3>Контакты</h3><p>+7 (495) 318-27-64</p><p>hello@istoriya-chaynikov.ru</p><p>Москва, ул. Лесная, 14, оф. 302</p><button type="button" className="footer-column-button" onClick={() => setFeedbackOpen(true)}>Обратная связь</button></div>
          <div className="footer-column"><h3>О проекте</h3><button type="button" className="footer-column-button" onClick={() => setMissionOpen(true)}>Наша миссия</button></div>
          <div className="footer-newsletter"><h3>Письма с историей</h3><p>Красивые открытия и новые лекции — раз в неделю.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder="Ваш email" aria-label="Ваш email" /><button type="submit" aria-label="Подписаться"><IconArrowRight /></button></form><small>Подписываясь, вы соглашаетесь с политикой конфиденциальности.</small></div>
        </div>
        <div className="footer-bottom section-wrap"><span>СОЗДАНО С ЛЮБОВЬЮ К ИСТОРИИ</span><span>МОСКВА · ВЕЗДЕ</span><Link to="/#home">НАВЕРХ ↑</Link></div>
        <MissionDialog open={missionOpen} onOpenChange={setMissionOpen} />
        <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      </footer>}
    </div>
  );
}
