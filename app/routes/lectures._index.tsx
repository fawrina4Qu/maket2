import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { lectureSections } from "@/lib/lectures";
import { PageHeading } from "@/components/page-heading";

export function meta() {
  return [{ title: "Лекции — История России для чайников" }];
}

export default function LecturesIndexRoute() {
  return (
    <>
      <PageHeading eyebrow="ЛЕКЦИИ ПО ЭПОХАМ" title={<>История по <em>разделам</em></>}>Выберите период, чтобы открыть подборку лекций и пройти путь от первых князей до современной России.</PageHeading>
      <section className="lecture-sections section-wrap page-content">
        {lectureSections.map((section, index) => (
          <Link className="lecture-section-card" to={`/lectures/${section.id}`} key={section.id}>
            <span className="lecture-section-number">РАЗДЕЛ 0{index + 1}</span>
            <span className="lecture-section-era">{section.era}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className="lecture-section-footer">{section.lectures.length} лекций <IconArrowRight size={17} /></span>
          </Link>
        ))}
      </section>
    </>
  );
}
