import { Lecture } from "@/lib/lectures";

export function LectureGrid({ lectures }: { lectures: Lecture[] }) {
  return (
    <div className="lecture-grid">
      {lectures.map((lecture, index) => (
        <article className="lecture-card" key={lecture.title}>
          <div className="lecture-image">
            <img src={lecture.image} alt={`Иллюстрация: ${lecture.title}`} loading="lazy" />
            {lecture.isNew && <span className="lecture-tag">НОВАЯ ЛЕКЦИЯ</span>}
            <span className="lecture-number">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="lecture-info">
            <h2>{lecture.title}</h2>
            <p>{lecture.detail}</p>
            <span className="lecture-meta">ИСТОРИЯ РОССИИ</span>
          </div>
        </article>
      ))}
    </div>
  );
}
