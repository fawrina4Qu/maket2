import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { HomeLink } from "@/components/home-link";
import { PageHeading } from "@/components/page-heading";

const pages = [
  {
    title: "Правление княгини Ольги · 945–962/969",
    paragraphs: ["Ольга правила как регентша при малолетнем сыне Святославе после гибели мужа, князя Игоря."],
    items: [],
  },
  {
    title: "Месть древлянам",
    paragraphs: ["После убийства Игоря древлянами, во время сбора дани, Ольга жестоко отомстила за смерть мужа."],
    items: [
      { label: "Первый этап", text: "ладьи с послами древлян закопали живыми" },
      { label: "Второй этап", text: "сожгла баню с другими послами" },
      { label: "Третий этап", text: "устроила тризну (поминальный пир), перебив 5 000 древлян, а затем сожгла их столицу — город Искоростень (с помощью птиц с горящей паклей)" },
    ],
  },
  {
    title: "Реформа налогообложения",
    paragraphs: ["Ольга упорядочила сбор дани, чтобы избежать новых восстаний. Это было самое важное для государства."],
    items: [
      { label: "Уроки", text: "фиксированный (точный) размер дани" },
      { label: "Погосты", text: "специальные места (крепости), куда свозили дань" },
      { label: "Повоз", text: "способ доставки дани: сами крестьяне везли её на погост" },
    ],
  },
  {
    title: "Значение реформы",
    paragraphs: ["Это была первая государственная реформа, заложившая основы налоговой системы Руси."],
    items: [],
  },
  {
    title: "Внешняя политика и религия",
    paragraphs: ["В 955 (или 957) году Ольга совершила поездку в Константинополь и приняла христианство с именем Елена. Она пыталась склонить к крещению сына Святослава, но он отказался."],
    items: [
      { label: "Дипломатия", text: "наладила отношения с Византией и Германией" },
    ],
  },
  {
    title: "Правление Святослава Игоревича · 962–972",
    paragraphs: ["Святослав вошёл в историю как князь-воин, который практически всю жизнь провёл в походах. Он не занимался внутренними делами — администрацией и судом, а его мать Ольга продолжала управлять Русью в его отсутствие."],
    items: [],
  },
  {
    title: "Характер и образ жизни",
    paragraphs: ["Так описывает его летопись."],
    items: [
      { label: "Быт", text: "вёл спартанский образ жизни: не носил роскошных одежд, ел мясо, запечённое на углях, спал на земле, подложив седло" },
      { label: "Предупреждение", text: "перед нападением всегда отправлял гонца с предупреждением «Иду на вы»" },
    ],
  },
  {
    title: "Военные походы",
    paragraphs: ["Основные походы Святослава были направлены против хазар и Балкан."],
    items: [
      { label: "Хазарский каганат · 965 г.", text: "Святослав разбил хазар, взял их столицу Итиль и крепость Саркел. Хазария перестала быть главным соперником Руси на востоке, открылись пути для торговли с Востоком" },
      { label: "Балканы · 967–971 гг.", text: "по просьбе Византии разгромил Болгарское царство. Затем решил остаться на Балканах и перенести туда столицу (в город Переяславец), что привело к войне с Византией" },
      { label: "Доростол", text: "после тяжёлой осады крепости Доростол заключил мир с императором Цимисхием и обязался уйти на Русь" },
    ],
  },
  {
    title: "Гибель Святослава · 972",
    paragraphs: ["Возвращаясь из Балканского похода в 972 году, Святослав попал в засаду печенегов у днепровских порогов. Печенежский хан Куря убил его и сделал из его черепа чашу для питья."],
    items: [],
  },
  {
    title: "Итоги правления Ольги и Святослава",
    paragraphs: [],
    items: [
      { label: "Внутренняя политика", text: "Ольга создала налоговую систему (уроки и погосты) и укрепила центральную власть, заложив фундамент государственности" },
      { label: "Внешняя политика", text: "Святослав обезопасил юго-восточные границы (разгром Хазарии), но из-за его увлечённости Балканами Русь на время потеряла контроль над некоторыми землями, например вятичи снова отделились" },
      { label: "Религия", text: "Ольга сделала первый шаг к христианизации Руси, показав пример и подготовив почву для будущего Крещения при её внуке Владимире" },
    ],
  },
];

const videoUrl = "https://www.youtube.com/embed/anz3nBhMdiA";

export function meta() {
  return [{ title: "Ольга и Святослав — конспект" }];
}

export default function OlgaSvyatoslavNotesRoute() {
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
        title={<>Правление Ольги и <em>Святослава</em></>}
        afterCopy={<HomeLink inline />}
      >
        Налоговая реформа Ольги и разгром Хазарского каганата Святославом.
      </PageHeading>
      <section className="slavic-notes section-wrap" aria-label="Конспект: Правление Ольги и Святослава">
        <Link className="lecture-back-link" to="/lectures/ancient-rus"><IconArrowLeft size={17} /> Все лекции Древней Руси</Link>
        <figure className="slavic-notes-video">
          <iframe
            src={videoUrl}
            title="Видео о правлении Ольги и Святослава"
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
