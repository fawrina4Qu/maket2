import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router";
import { toggleLectureFavorite, useLectureFavorites } from "@/lib/favorites-store";
import { Lecture } from "@/lib/lectures";

export function LectureGrid({ lectures }: { lectures: Lecture[] }) {
  const favorites = useLectureFavorites();

  return (
    <div className="lecture-grid">
      {lectures.map((lecture, index) => {
        const isFavorite = favorites.includes(lecture.title);
        return (
          <article className="lecture-card" id={`lecture-${index + 1}`} key={lecture.title}>
            <div className="lecture-image">
              {lecture.to ? (
                <Link className="lecture-image-link" to={lecture.to} aria-label={`Открыть конспект: ${lecture.title}`}>
                  <img src={lecture.image} alt={`Иллюстрация: ${lecture.title}`} loading="lazy" />
                </Link>
              ) : (
                <img src={lecture.image} alt={`Иллюстрация: ${lecture.title}`} loading="lazy" />
              )}
              {lecture.isNew && <span className="lecture-tag">НОВАЯ ЛЕКЦИЯ</span>}
              <button
                className={`lecture-favorite${isFavorite ? " is-favorite" : ""}`}
                onClick={() => toggleLectureFavorite(lecture.title)}
                aria-label={isFavorite ? `Убрать «${lecture.title}» из избранного` : `Добавить «${lecture.title}» в избранное`}
                aria-pressed={isFavorite}
              >
                <IconHeart size={19} />
              </button>
              <span className="lecture-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="lecture-info">
              <h2>{lecture.title}</h2>
              <p>{lecture.detail}</p>
              <span className="lecture-meta">ИСТОРИЯ РОССИИ</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
