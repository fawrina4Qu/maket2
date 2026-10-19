import { IconArrowRight, IconStarFilled } from "@tabler/icons-react";
import { Link } from "react-router";
import { popular } from "@/lib/catalog";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Любимые курсы — История России для чайников" }];
}

export default function FavoriteCoursesRoute() {
  return (
    <SiteLayout>
      <PageHeading eyebrow="ВЫБОР УЧАЩИХСЯ" title={<>Любимые <em>курсы</em></>}>Самые популярные курсы платформы — с высокими оценками учеников.</PageHeading>
      <section className="favorites-page section-wrap">
        <div className="popular-list">{popular.map(([number, title, rating]) => <Link to="/lectures" className="popular-row" key={number}><span className="popular-number">{number}</span><span className="popular-title">{title}</span><span className="popular-rating"><IconStarFilled size={11} /> {rating}</span><IconArrowRight className="popular-arrow" size={16} /></Link>)}</div>
        <Link to="/lectures" className="button button-primary">Смотреть все лекции <IconArrowRight size={16} /></Link>
      </section>
    </SiteLayout>
  );
}
