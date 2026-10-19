import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocation } from "react-router";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "О нас — История России для чайников" }];
}

export default function AboutRoute() {
  const [missionOpen, setMissionOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#mission") setMissionOpen(true);
  }, [hash]);

  return (
    <SiteLayout>
      <PageHeading eyebrow="ЛИЦО И ИДЕЯ ПЛАТФОРМЫ" title={<>Учиться красиво.<br /><em>Помнить глубоко.</em></>}>О проекте и нашей миссии.</PageHeading>
      <section className="founder section-wrap" id="creator">
        <div className="founder-photo"><img src="https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fb02e2d68b7f44d748fd29d625bdeacdd?format=webp&width=800&height=1200" alt="Портрет создателя проекта" /></div>
        <div className="founder-copy">
          <p className="eyebrow">СОЗДАТЕЛЬ ПРОЕКТА</p>
          <h2>Мария <em>Соколова</em></h2>
          <p className="founder-degree">Историк, автор лекционного проекта</p>
          <ul className="creator-achievements">
            <li>Создала цикл лекций по истории России для широкой аудитории.</li>
            <li>Запустила сообщество #BlossomHistory, где делятся любовью к истории.</li>
            <li>Разработала тематические маршруты по ключевым эпохам.</li>
          </ul>
        </div>
      </section>
      <section className="mission section-wrap" id="mission">
        <button className="mission-toggle" onClick={() => setMissionOpen(!missionOpen)} aria-expanded={missionOpen}>
          Наша миссия <IconChevronDown size={24} />
        </button>
        {missionOpen && <p className="mission-text">Миссия нашего проекта — сохранить историческую память и передать её будущим поколениям. Мы верим, что знание прошлого помогает осознать настоящее и уверенно строить будущее. Наша платформа — это мост между великими страницами истории России и современным человеком.</p>}
      </section>
    </SiteLayout>
  );
}
