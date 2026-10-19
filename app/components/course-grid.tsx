import { useState } from "react";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";
import { courses as catalog } from "@/lib/catalog";

export function CourseGrid() {
  const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <div className="course-grid">
      {catalog.map((course, index) => {
        const isFavorite = favorites.includes(course.title);
        return (
          <article className="course-card" key={course.title}>
            <div className="course-image">
              <img src={course.image} alt={`Иллюстрация курса «${course.title}»`} />
              <span className="course-tag">{course.category}</span>
              <button
                className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
                onClick={() => setFavorites((current) => isFavorite ? current.filter((item) => item !== course.title) : [...current, course.title])}
                aria-label={isFavorite ? `Убрать курс «${course.title}» из избранного` : `Добавить курс «${course.title}» в избранное`}
                aria-pressed={isFavorite}
              >
                <IconHeart size={19} />
              </button>
              <span className="course-number">0{index + 1}</span>
            </div>
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.detail}</p>
              <div className="course-bottom"><span>ОТ 1 490 ₽</span><span className="course-more"><IconArrowRight size={17} /></span></div>
              <div className="course-progress"><span style={{ width: `${18 + index * 9}%` }} /></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
