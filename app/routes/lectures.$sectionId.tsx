import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { LectureGrid } from "@/components/lecture-grid";
import { PageHeading } from "@/components/page-heading";
import { lectureSections } from "@/lib/lectures";

export function meta() {
  return [{ title: "Раздел лекций — История России для чайников" }];
}

export default function LectureSectionRoute() {
  const { sectionId } = useParams();
  const section = lectureSections.find((item) => item.id === sectionId);

  if (!section) {
    return (
      <>
        <PageHeading eyebrow="ЛЕКЦИИ" title={<>Раздел не <em>найден</em></>}>Выберите одну из исторических эпох в каталоге лекций.</PageHeading>
        <section className="section-wrap page-content"><Link className="button button-outline" to="/lectures"><IconArrowLeft size={16} /> Все разделы</Link></section>
      </>
    );
  }

  return (
    <>
      <PageHeading eyebrow={`${section.era} · ${section.lectures.length} ЛЕКЦИЙ`} title={<>{section.title} <em>{section.era}</em></>}>{section.description}</PageHeading>
      <section className="section-wrap page-content">
        <Link className="lecture-back-link" to="/lectures"><IconArrowLeft size={17} /> Все разделы лекций</Link>
        <LectureGrid lectures={section.lectures} />
      </section>
    </>
  );
}
