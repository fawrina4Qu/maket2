import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Империя Романовых — История России для чайников" }];
}

const blocks = [
  {
    icon: "",
    title: "Становление империи",
    period: "XVII – начало XVIII в.",
    topics: [
      { name: "Воцарение Романовых (1613 г.)", text: "Михаил Фёдорович и преодоление последствий Смуты." },
      { name: "Правление Алексея Михайловича «Тишайшего»", text: "Соборное уложение 1649 г., воссоединение с Украиной (Переяславская рада 1654 г.)." },
      { name: "Церковный раскол", text: "Реформы патриарха Никона и протест протопопа Аввакума." },
      { name: "Эпоха Петра I (1682–1725)", text: "Северная война, создание флота, провозглашение Российской империи (1721 г.)." },
      { name: "Дворцовые перевороты (1725–1762)", text: "Борьба за власть после Петра I, правление Елизаветы Петровны." },
    ],
  },
  {
    icon: "🌟",
    title: "Золотой век",
    period: "вторая половина XVIII в.",
    topics: [
      { name: "Правление Екатерины II (1762–1796)", text: "Просвещённый абсолютизм, Уложенная комиссия, Жалованные грамоты дворянству и городам." },
      { name: "Внешняя политика Екатерины II", text: "Русско-турецкие войны, присоединение Крыма (1783 г.), разделы Речи Посполитой." },
      { name: "Восстание Емельяна Пугачёва (1773–1775)", text: "Причины, ход и последствия крестьянской войны." },
      { name: "Правление Павла I (1796–1801)", text: "Указ о престолонаследии, непредсказуемая внешняя и внутренняя политика." },
    ],
  },
  {
    icon: "⚔️",
    title: "Первая половина XIX века",
    period: "",
    topics: [
      { name: "Правление Александра I", text: "Реформы Сперанского, проект конституции, Отечественная война 1812 года." },
      { name: "Движение декабристов (1825 г.)", text: "Тайные общества, восстание на Сенатской площади и его итоги." },
      { name: "Правление Николая I (1825–1855)", text: "Кодификация законов, теория официальной народности, Крымская война (1853–1856)." },
      { name: "Культура первой половины XIX века", text: "«Золотой век» русской литературы (Пушкин, Лермонтов, Гоголь)." },
    ],
  },
  {
    icon: "🔄",
    title: "Эпоха Великих реформ",
    period: "вторая половина XIX в.",
    topics: [
      { name: "Правление Александра II (1855–1881)", text: "Отмена крепостного права (1861 г.), судебная, земская и военная реформы." },
      { name: "Внешняя политика Александра II", text: "Продажа Аляски (1867 г.), присоединение Средней Азии, Русско-турецкая война 1877–1878 гг." },
      { name: "Народничество и убийство Александра II", text: "Деятельность «Земли и воли» и «Народной воли» (1881 г.)." },
      { name: "Правление Александра III (1881–1894)", text: "Политика контрреформ, укрепление самодержавия, промышленный подъём." },
    ],
  },
  {
    icon: "💥",
    title: "Закат империи",
    period: "конец XIX – начало XX в.",
    topics: [
      { name: "Правление Николая II", text: "Экономическое развитие (реформы Витте и Столыпина), нарастание кризиса." },
    ],
  },
];

export default function RomanovEraRoute() {
  return (
    <SiteLayout>
      <PageHeading eyebrow="1613 — 1917" title={<>Империя <em>Романовых</em></>}>Золотой век русской культуры и государственности: от Смуты до падения монархии.</PageHeading>
      <section className="section-wrap romanov-page">
        <Link className="lecture-back-link" to="/eras"><IconArrowLeft size={17} /> Все эпохи</Link>
        {blocks.map((block, blockIndex) => (
          <div className="romanov-block" key={block.title}>
            <header className="romanov-block-head">
              <span className="romanov-block-number">{String(blockIndex + 1).padStart(2, "0")}</span>
              <h2>{block.icon && <span aria-hidden="true">{block.icon} </span>}Блок {blockIndex + 1}: {block.title}{block.period && ` (${block.period})`}</h2>
            </header>
            <ul className="romanov-topics">
              {block.topics.map((topic) => (
                <li className="romanov-topic" key={topic.name}>
                  <h3>{topic.name}</h3>
                  <p>{topic.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
