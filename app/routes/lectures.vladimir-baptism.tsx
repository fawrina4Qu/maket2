import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { HomeLink } from "@/components/home-link";
import { PageHeading } from "@/components/page-heading";

const pages = [
  {
    title: "Приход к власти · 978–980 гг.",
    paragraphs: ["Междоусобица: после гибели Святослава в 972 году началась война между его сыновьями (Ярополком, Олегом и Владимиром)."],
    items: [
      { label: "Победа Владимира", text: "Владимир, внебрачный сын Святослава и ключницы Малуши, бежал в Скандинавию, собрал войско варягов и в 978 (по другим данным 980) году захватил Киев, убив брата Ярополка" },
    ],
  },
  {
    title: "Первые шаги Владимира",
    paragraphs: ["Владимир начал с укрепления язычества, чтобы объединить племена."],
    items: [
      { label: "Пантеон", text: "создал пантеон главных богов (Перун, Хорс, Дажьбог, Стрибог, Симаргл, Мокошь) и установил их идолов на холме в Киеве" },
    ],
  },
  {
    title: "Предпосылки Крещения Руси",
    paragraphs: ["Крещение Руси в 988 году было подготовлено сразу несколькими причинами."],
    items: [
      { label: "Политические", text: "необходимость объединения разрозненных славянских племён в единое государство с единой идеологией" },
      { label: "Внешнеполитические", text: "желание укрепить международный авторитет Руси и наладить равноправные отношения с христианскими странами Европы, в первую очередь с Византией" },
      { label: "Социальные", text: "язычество не отвечало новым реалиям: росту городов, социальному расслоению и новым нормам морали" },
    ],
  },
  {
    title: "«Выбор веры» по летописи",
    paragraphs: ["Владимир выслушал представителей разных религий: ислам из Волжской Булгарии, иудаизм от хазар, католичество от немцев и православие от греков. Затем он отправил послов для «проверки» служб. Послы, побывав в византийском храме, были поражены красотой и великолепием богослужения."],
    items: [],
  },
  {
    title: "Ход Крещения Руси",
    paragraphs: [],
    items: [
      { label: "Корсунская легенда", text: "Владимир осадил греческий город Херсонес (Корсунь) в Крыму. Взамен на согласие креститься и жениться на византийской принцессе Анне он потребовал её в жёны" },
      { label: "Личное крещение", text: "Владимир принял христианство в Корсуни и получил имя Василий" },
      { label: "Массовое крещение", text: "вернувшись в Киев, он крестил 12 сыновей и дружину, а затем приказал сбросить идола Перуна в Днепр и крестить киевлян. Позже христианство распространялось по всей Руси, часто «огнём и мечом», особенно в Новгороде" },
    ],
  },
  {
    title: "Значение Крещения Руси",
    paragraphs: [],
    items: [
      { label: "Объединение", text: "ускорило консолидацию древнерусских племён в единую нацию" },
      { label: "Власть", text: "укрепило княжескую власть, ведь церковь учила подчиняться князю" },
      { label: "Культура", text: "привело к появлению письменности (кириллицы), летописания, каменного зодчества, иконописи и школ" },
      { label: "Быт и нравы", text: "запретило кровную месть, многожёнство и человеческие жертвоприношения" },
      { label: "Международный авторитет", text: "укрепило положение Руси на международной арене" },
    ],
  },
  {
    title: "Правление Владимира Святого · 980–1015 гг.",
    paragraphs: ["Владимир вошёл в историю как Владимир Святой и Владимир Красное Солнышко (в былинах)."],
    items: [],
  },
  {
    title: "Внутренняя политика",
    paragraphs: [],
    items: [
      { label: "Оборона границ", text: "построил систему крепостей и сигнальных башен (засечные черты) на южных границах для защиты от набегов печенегов" },
      { label: "Административные реформы", text: "посадил своих сыновей наместниками в крупных городах, заменив местных племенных князей. Это укрепило центральную власть" },
      { label: "Церковная организация", text: "в 988 году создал Русскую митрополию во главе с греческим митрополитом, началось строительство храмов, в том числе Десятинной церкви в Киеве" },
    ],
  },
  {
    title: "Внешняя политика",
    paragraphs: [],
    items: [
      { label: "Защита южных рубежей", text: "в 992 и 997 годах одержал крупные победы над печенегами" },
      { label: "Расширение границ", text: "окончательно присоединил земли вятичей, радимичей и Червенские города (Галицию)" },
      { label: "Дипломатия", text: "династические браки: сам женился на византийской принцессе Анне, а своих сыновей и дочерей женил и выдавал замуж за европейских монархов" },
    ],
  },
  {
    title: "Итоги правления Владимира",
    paragraphs: [],
    items: [
      { label: "Объединение", text: "завершил объединение восточнославянских земель в единое государство" },
      { label: "Религия", text: "ввёл единую государственную религию, что стало мощным фактором формирования русской нации" },
      { label: "Оборона", text: "создал надёжную систему защиты от кочевников" },
      { label: "Международное положение", text: "укрепил международное положение Киевской Руси" },
    ],
  },
];

const videoUrl = "https://www.youtube.com/embed/yd9P7c8_aHg";

export function meta() {
  return [{ title: "Крещение Руси и Владимир Святой — конспект" }];
}

export default function VladimirBaptismNotesRoute() {
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
        title={<>Крещение Руси и правление <em>Владимира Святого</em></>}
        afterCopy={<HomeLink inline />}
      >
        Крещение Руси в 988 году, правление Владимира Святого, причины и последствия принятия христианства.
      </PageHeading>
      <section className="slavic-notes section-wrap" aria-label="Конспект: Крещение Руси и правление Владимира Святого">
        <Link className="lecture-back-link" to="/lectures/ancient-rus"><IconArrowLeft size={17} /> Все лекции Древней Руси</Link>
        <figure className="slavic-notes-video">
          <iframe
            src={videoUrl}
            title="Видео о крещении Руси и правлении Владимира Святого"
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
