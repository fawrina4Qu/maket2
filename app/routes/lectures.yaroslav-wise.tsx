import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { HomeLink } from "@/components/home-link";
import { PageHeading } from "@/components/page-heading";

const pages = [
  {
    title: "Приход к власти · 1015–1019 гг.",
    paragraphs: ["После смерти Владимира Святославича в 1015 году началась междоусобная борьба. Киевский престол захватил Святополк, который убил братьев Бориса и Глеба (позже причисленных к лику святых). Ярослав, княживший в Новгороде, выступил против него и в 1019 году утвердился в Киеве."],
    items: [],
  },
  {
    title: "Борьба с Мстиславом · 1024–1036 гг.",
    paragraphs: ["Однако борьба за власть на этом не закончилась. Его брат Мстислав Тмутараканский в 1024 году разбил войска Ярослава."],
    items: [
      { label: "Раздел земель", text: "братья заключили соглашение о разделе земель по Днепру: Ярослав получил западную часть с Киевом, а Мстислав — восточную" },
      { label: "Единовластие", text: "только после смерти Мстислава в 1036 году Ярослав стал единоличным правителем всей Руси" },
    ],
  },
  {
    title: "«Русская Правда»",
    paragraphs: ["Главным деянием Ярослава на внутренней арене стало создание первого письменного свода законов — «Русской Правды». Её древнейшая часть («Правда Ярослава») содержала около 17 статей и была создана около 1016 года, ещё когда он княжил в Новгороде."],
    items: [],
  },
  {
    title: "Виры и социальное неравенство",
    paragraphs: ["Этот документ заменил языческие обычаи, в частности ограничил кровную месть, системой денежных штрафов (вир). «Русская Правда» защищала жизнь, здоровье и имущество свободных людей, но при этом закрепляла социальное неравенство: за убийство знатного человека штраф был значительно выше, чем за простолюдина."],
    items: [],
  },
  {
    title: "Церковная политика",
    paragraphs: ["В церковной сфере Ярослав стремился к независимости от Византии. В 1051 году, без согласования с Константинополем, киевским митрополитом был поставлен русский священник Иларион."],
    items: [],
  },
  {
    title: "Защита границ и расширение территорий",
    paragraphs: ["На внешней арене Ярослав действовал как силой, так и дипломатией."],
    items: [
      { label: "Защита границ", text: "в 1036 году он нанёс сокрушительное поражение печенегам, после чего их набеги на Русь практически прекратились" },
      { label: "Расширение территорий", text: "он вернул Червенские города, захваченные Польшей, покорил земли эстов (чуди) и основал город Юрьев (современный Тарту)" },
    ],
  },
  {
    title: "Династические браки",
    paragraphs: ["Это было главным дипломатическим инструментом Ярослава."],
    items: [
      { label: "Ингигерда", text: "жена Ярослава была шведской принцессой" },
      { label: "Дочери", text: "стали королевами Франции (Анна), Венгрии и Норвегии" },
      { label: "Всеволод", text: "сын женился на византийской принцессе из рода Мономахов" },
      { label: "Родство с Европой", text: "сам Ярослав породнился с правящими домами Польши, Германии и других стран, что невероятно подняло престиж Руси в Европе" },
    ],
  },
  {
    title: "Культура и строительство",
    paragraphs: ["Ярослав стремился превратить Киев в «новый Константинополь». При нём город был значительно расширен и обнесён новыми стенами с Золотыми воротами. Главным архитектурным символом эпохи стал Софийский собор в Киеве, построенный в честь победы над печенегами. При Ярославе также велось активное строительство монастырей и храмов, развивалось летописание и книжное дело."],
    items: [],
  },
  {
    title: "Итоги правления",
    paragraphs: ["Ярослав Мудрый оставил после себя мощное, централизованное государство с единым законом и признанным в Европе авторитетом. Однако, опасаясь повторения междоусобиц, он перед смертью (1054) разделил земли между сыновьями, закрепив «лествичный» порядок наследования (по старшинству в роду), который, к сожалению, в долгосрочной перспективе привёл к новой раздробленности."],
    items: [],
  },
];

const videoUrl = "https://www.youtube.com/embed/qUpK2CWIDhU";

export function meta() {
  return [{ title: "Правление Ярослава Мудрого — конспект" }];
}

export default function YaroslavWiseNotesRoute() {
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
        title={<>Правление <em>Ярослава Мудрого</em></>}
        afterCopy={<HomeLink inline />}
      >
        Русская Правда, укрепление государства и династические браки.
      </PageHeading>
      <section className="slavic-notes section-wrap" aria-label="Конспект: Правление Ярослава Мудрого">
        <Link className="lecture-back-link" to="/lectures/ancient-rus"><IconArrowLeft size={17} /> Все лекции Древней Руси</Link>
        <figure className="slavic-notes-video">
          <iframe
            src={videoUrl}
            title="Видео о правлении Ярослава Мудрого"
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
