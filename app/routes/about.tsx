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
      <section className="mission section-wrap" id="mission">
        <button className="mission-toggle" onClick={() => setMissionOpen(!missionOpen)} aria-expanded={missionOpen}>
          Наша миссия <IconChevronDown size={24} />
        </button>
        {missionOpen && <p className="mission-text">Миссия нашего проекта — сохранить историческую память и передать её будущим поколениям. Мы верим, что знание прошлого помогает осознать настоящее и уверенно строить будущее. Наша платформа — это мост между великими страницами истории России и современным человеком.</p>}
      </section>
    </SiteLayout>
  );
}
