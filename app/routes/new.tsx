import { LectureGrid } from "@/components/lecture-grid";
import { HomeLink } from "@/components/home-link";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";
import { newLectures } from "@/lib/lectures";

export function meta() {
  return [{ title: "Новинки — История России для чайников" }];
}

export default function NewArrivalsRoute() {
  return (
    <SiteLayout showHomeLink={false}>
      <PageHeading eyebrow="СВЕЖИЕ МАТЕРИАЛЫ" title={<>Новые <em>лекции</em></>} afterCopy={<HomeLink inline />}>Недавно добавленные лекции по истории России.</PageHeading>
      <section className="section-wrap page-content"><LectureGrid lectures={newLectures} /></section>
    </SiteLayout>
  );
}
