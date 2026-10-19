import { IconBooks, IconHourglass, IconMap2 } from "@tabler/icons-react";
import { Link } from "react-router";
import { SectionNav } from "@/components/section-nav";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Начать путешествие — История России для чайников" }];
}

const destinations = [
  {
    to: "/lectures",
    title: "Все лекции",
    icon: IconBooks,
    text: "От призвания варягов до наших дней: короткие и понятные лекции о каждом веке, событии и правителе. Читайте по порядку или выбирайте тему, которая вас интересует.",
  },
  {
    to: "/map",
    title: "Интерактивная карта",
    icon: IconMap2,
    text: "Смотрите, как менялась территория страны и где происходили главные события. Выбирайте город или регион и узнавайте, что там произошло.",
  },
  {
    to: "/eras",
    title: "Ключевые эпохи",
    icon: IconHourglass,
    text: "Путешествие по главным периодам российской истории: от древних княжеств до империи Романовых. Каждая эпоха — это история с контекстом, героями и последствиями.",
  },
];

export default function JourneyRoute() {
  return (
    <SiteLayout showCommunity={false}>
      <section className="journey-page section-wrap">
        <SectionNav className="journey-nav" />
        <div className="journey-grid">
          {destinations.map(({ to, title, icon: Icon, text }) => (
            <Link className="journey-block" to={to} key={to}>
              <span className="journey-icon"><Icon size={34} stroke={1.5} /></span>
              <h2>{title}</h2>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
