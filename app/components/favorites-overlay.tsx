import { IconX } from "@tabler/icons-react";
import { Link } from "react-router";
import { setFavoritesPanelOpen, useFavoritesPanelOpen, useLectureFavorites } from "@/lib/favorites-store";
import { allLectures } from "@/lib/lectures";

export function FavoritesOverlay() {
  const favoriteTitles = useLectureFavorites();
  const favoritesOpen = useFavoritesPanelOpen();
  const favoriteLectures = allLectures.filter((lecture) => favoriteTitles.includes(lecture.title));

  if (!favoritesOpen) return null;

  return (
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
  );
}
