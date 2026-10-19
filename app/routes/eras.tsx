import { Link } from "react-router";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Ключевые эпохи — История России для чайников" }];
}

export default function ErasRoute() {
  return (
    <SiteLayout>
      <PageHeading eyebrow="ПУТЕШЕСТВИЕ СКВОЗЬ ВРЕМЯ" title={<>Ключевые <em>эпохи</em></>}>От древних городов и княжеств — к империи и культурным переменам.</PageHeading>
      <section className="eras-section eras-page"><div className="section-wrap"><div className="era-grid">
        <Link className="era-card era-one" to="/lectures"><img src="https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fc1ba7c66eb1347a492d1bbaa49589a5c?format=webp&width=800&height=1200" alt="Старинная Москва" /><div className="era-number">01 / 02</div><div className="era-card-copy"><span>XII — XVII ВЕК</span><h2>Московское<br />царство</h2><p>От Ивана Калиты до Смутного времени.</p><b>ИЗУЧИТЬ ЭПОХУ <span>→</span></b></div></Link>
        <Link className="era-card era-two" to="/lectures"><img src="https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fce460d4c2ce8451e82b8b60224055551?format=webp&width=800&height=1200" alt="Семья Романовых" /><div className="era-number">02 / 02</div><div className="era-card-copy"><span>1613 — 1917</span><h2>Империя<br />Романовых</h2><p>Золотой век русской культуры и государственности.</p><b>ИЗУЧИТЬ ЭПОХУ <span>→</span></b></div></Link>
      </div></div></section>
    </SiteLayout>
  );
}
