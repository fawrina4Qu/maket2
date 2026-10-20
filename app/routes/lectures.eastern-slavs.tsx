import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { HomeLink } from "@/components/home-link";
import { PageHeading } from "@/components/page-heading";

const pages = [
  {
    title: "Происхождение и этногенез",
    paragraphs: [
      "Славяне выделились из индоевропейской общности. Предками славян считаются племена, жившие в Центральной и Восточной Европе.",
      "Происхождение славян объясняют, в частности, дунайской и висло-одерской теориями.",
    ],
    items: [],
  },
  {
    title: "Три ветви славян",
    paragraphs: ["В VI–VII веках славяне разделились на три ветви."],
    items: [
      { label: "Западные", text: "поляки, чехи, словаки" },
      { label: "Южные", text: "болгары, сербы, хорваты" },
      { label: "Восточные", text: "русские, украинцы, белорусы" },
    ],
  },
  {
    title: "Расселение восточных славян",
    paragraphs: ["Восточные славяне заселили Восточно-Европейскую равнину. Их племена объединялись в союзы."],
    items: [
      { label: "Поляне", text: "район Киева" },
      { label: "Словене", text: "район Новгорода" },
      { label: "Другие союзы", text: "древляне, кривичи, вятичи и другие" },
    ],
  },
  {
    title: "Занятия и торговля",
    paragraphs: ["Основу хозяйства составляли земледелие и промыслы. Развивались ремёсла и торговля."],
    items: [
      { label: "Земледелие", text: "подсечно-огневое на севере и пашенное на юге" },
      { label: "Промыслы", text: "скотоводство, охота, рыболовство и бортничество — сбор мёда" },
      { label: "Торговля", text: "путь «из варяг в греки»" },
    ],
  },
];

const mapImage = "https://cdn.builder.io/api/v1/image/assets%2F3b201758f3a8485faf936b068ebfab52%2F33dfd2b7e7c94b3cbf16671dbcb435ca?format=webp&width=800&height=1200";

export function meta() {
  return [{ title: "Восточные славяне — конспект" }];
}

export default function EasternSlavsNotesRoute() {
  const [activePage, setActivePage] = useState(0);
  const page = pages[activePage];

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".agent-native-app-main") ?? window;
    scroller.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function showPage(index: number) {
    setActivePage((index + pages.length) % pages.length);
  }

  return (
    <>
      <PageHeading
        eyebrow="КОНСПЕКТ · ДРЕВНЯЯ РУСЬ"
        title={<>Восточные <em>славяне</em></>}
        afterCopy={<HomeLink inline />}
      >
        Происхождение и расселение восточных славян.
      </PageHeading>
      <section className="slavic-notes section-wrap" aria-label="Конспект: Восточные славяне">
        <Link className="lecture-back-link" to="/lectures/ancient-rus"><IconArrowLeft size={17} /> Все лекции Древней Руси</Link>
        <figure className="slavic-notes-image">
          <img src={mapImage} alt="Карта расселения славян в Восточной Европе в V–VII веках" />
        </figure>
        <section className="slavic-notes-page" aria-live="polite">
          <p className="eyebrow">СТРАНИЦА {activePage + 1} ИЗ {pages.length}</p>
          <h2>{page.title}</h2>
          {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {page.items.length > 0 && (
            <ul>
              {page.items.map((item) => <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>)}
            </ul>
          )}
        </section>
        <nav className="slavic-notes-pagination" aria-label="Страницы конспекта">
          <button type="button" className="slavic-notes-arrow" onClick={() => showPage(activePage - 1)} aria-label="Предыдущая страница"><IconArrowLeft size={18} /></button>
          {pages.map((item, index) => (
            <button
              type="button"
              className={index === activePage ? "slavic-notes-number is-active" : "slavic-notes-number"}
              key={item.title}
              onClick={() => showPage(index)}
              aria-label={`Страница ${index + 1}: ${item.title}`}
              aria-current={index === activePage ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}
          <button type="button" className="slavic-notes-arrow" onClick={() => showPage(activePage + 1)} aria-label="Следующая страница"><IconArrowRight size={18} /></button>
        </nav>
      </section>
    </>
  );
}
