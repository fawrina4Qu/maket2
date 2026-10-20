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
  {
    title: "Общественный строй и верования",
    paragraphs: [
      "Происходил переход от родовой общины к соседской (территориальной). Появлялось имущественное неравенство и складывалась знать: князья, дружина и старейшины.",
    ],
    items: [
      { label: "Управление", text: "народное собрание — вече; важные вопросы решались сообща" },
      { label: "Религия", text: "язычество (политеизм). Перун — гром, молния и покровитель воинов; Велес — скот и богатство; Сварог — кузнечное дело и небо; Мокошь — женское начало и плодородие. Также верили в домовых, леших и русалок" },
    ],
  },
  {
    title: "Предпосылки образования государства",
    paragraphs: ["Государство — аппарат управления обществом. У восточных славян сложились предпосылки для его появления."],
    items: [
      { label: "Экономические", text: "развитие земледелия, ремесла и торговли, появление излишков и неравенства" },
      { label: "Социальные", text: "расслоение общества на богатых и бедных, выделение знати" },
      { label: "Политические", text: "усложнение управления, защита от внешних врагов и потребность в единых законах" },
      { label: "Внешние", text: "влияние более развитых соседей — Византии и Хазарского каганата" },
    ],
  },
  {
    title: "Призвание варягов · 862 год",
    paragraphs: ["Согласно «Повести временных лет», в Новгороде возникли междоусобицы, и местное вече решило пригласить правителей со стороны."],
    items: [
      { label: "Призвание", text: "словене, кривичи и чудь пригласили Рюрика, Синеуса и Трувора «володеть и княжить»" },
      { label: "Расселение князей", text: "Рюрик стал княжить в Новгороде, Синеус — в Белоозере, Трувор — в Изборске" },
      { label: "Значение", text: "летописная традиция связывает это событие с началом русской государственности" },
    ],
  },
  {
    title: "Первые князья · Олег и Игорь",
    paragraphs: ["Объединение земель в единое государство заняло несколько десятилетий."],
    items: [
      { label: "Олег Вещий · 879–912", text: "в 882 году овладел Киевом и объединил север с югом, создав государство с центром в Киеве. Совершил походы на Византию в 907 и 911 годах" },
      { label: "Игорь · 912–945", text: "продолжал походы на Византию в 941 и 944 годах. Погиб у древлян во время сбора дани — полюдья" },
    ],
  },
  {
    title: "Первые князья · Ольга и Святослав",
    paragraphs: [],
    items: [
      { label: "Ольга · 945–962", text: "жена Игоря. Провела налоговую реформу: заменила полюдье уроками — фиксированным размером дани, и погостами — местами её сбора. Лично приняла христианство" },
      { label: "Святослав · 962–972", text: "полководец, разгромил Хазарский каганат в 965 году, воевал с Византией и Болгарией. Погиб от рук печенегов" },
    ],
  },
  {
    title: "Краткий вывод",
    paragraphs: ["Образование Древнерусского государства стало закономерным этапом развития восточнославянского общества: этому способствовали экономический рост, социальное расслоение и внешние угрозы. Призвание варягов ускорило объединение земель, но государственность сложилась на местной, славянской основе."],
    items: [],
  },
];

const videoUrl = "https://www.youtube.com/embed/cW2E00xFt5s";

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
        <figure className="slavic-notes-video">
          <iframe
            src={videoUrl}
            title="Видео о восточных славянах"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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
