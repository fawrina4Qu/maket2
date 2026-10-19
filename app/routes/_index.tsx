import { IconArrowRight, IconBook2, IconFlower } from "@tabler/icons-react";
import { Link } from "react-router";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [
    { title: "История России для чайников" },
    { name: "description", content: "Выберите направление для путешествия по истории России." },
  ];
}

export default function HomeRoute() {
  return (
    <SiteLayout>
      <section className="home-choices section-wrap">
        <div className="section-heading"><div><p className="eyebrow">ВЫБЕРИТЕ НАПРАВЛЕНИЕ</p><h1>С чего начнём <em>путешествие?</em></h1></div><Link className="text-link" to="/welcome">История России <IconArrowRight size={16} /></Link></div>
        <div className="home-choice-grid">
          <Link to="/new" className="home-choice"><IconFlower size={24} /><span className="eyebrow">СВЕЖИЕ ОТКРЫТИЯ</span><h2>Новинки</h2><p>Только недавно добавленные лекции.</p><b>ОТКРЫТЬ <IconArrowRight size={16} /></b></Link>
          <Link to="/eras" className="home-choice"><IconBook2 size={24} /><span className="eyebrow">ВРЕМЯ И ПЕРЕМЕНЫ</span><h2>Ключевые эпохи</h2><p>Путь от первых княжеств до современности.</p><b>ИССЛЕДОВАТЬ <IconArrowRight size={16} /></b></Link>
          <Link to="/lectures" className="home-choice"><IconBook2 size={24} /><span className="eyebrow">ЛЕКЦИИ ПО ЭПОХАМ</span><h2>Все лекции</h2><p>Исторические темы, собранные в пять разделов.</p><b>СМОТРЕТЬ РАЗДЕЛЫ <IconArrowRight size={16} /></b></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
