import { IconArrowRight, IconBook2, IconFlower, IconX } from "@tabler/icons-react";
import { Link } from "react-router";
import { SiteLayout } from "@/components/site-layout";
import { setFavoritesPanelOpen, useFavoritesPanelOpen, useLectureFavorites } from "@/lib/favorites-store";
import { allLectures } from "@/lib/lectures";

export function meta() {
  return [
    { title: "История России для чайников" },
    { name: "description", content: "Выберите направление для путешествия по истории России." },
  ];
}

export default function HomeRoute() {
  const favoriteTitles = useLectureFavorites();
  const favoritesOpen = useFavoritesPanelOpen();
  const favoriteLectures = allLectures.filter((lecture) => favoriteTitles.includes(lecture.title));

  return (
    <SiteLayout>
      {favoritesOpen && (
        <div className="favorites-overlay-backdrop" onClick={() => setFavoritesPanelOpen(false)}>
          <section className="favorites-overlay" role="dialog" aria-modal="true" aria-label="Понравившиеся лекции" onClick={(event) => event.stopPropagation()}>
            <div className="favorites-overlay-header">
              <div><p className="eyebrow">ВАШ СПИСОК</p><h2>Понравившиеся <em>лекции</em></h2></div>
              <button onClick={() => setFavoritesPanelOpen(false)} aria-label="Закрыть список"><IconX size={20} /></button>
            </div>
            {favoriteLectures.length === 0 ? (
              <p className="favorites-overlay-empty">Вы пока не отметили ни одной лекции сердечком.</p>
            ) : (
              <div className="favorites-overlay-list">
                {favoriteLectures.map((lecture) => (
                  <Link key={lecture.title} to={`/lectures/${lecture.sectionId}#lecture-${lecture.number}`} onClick={() => setFavoritesPanelOpen(false)}>
                    {lecture.title}
                    <span>{lecture.sectionTitle}</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
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
