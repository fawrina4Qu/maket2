import { Link } from "react-router";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Начать путешествие — История России для чайников" }];
}

export default function JourneyRoute() {
  return (
    <SiteLayout showCommunity={false}>
      <section className="journey-page section-wrap">
        <div className="journey-grid">
          <Link className="journey-block" to="/lectures">Все лекции</Link>
          <Link className="journey-block" to="/map">Интерактивная карта</Link>
          <Link className="journey-block" to="/eras">Ключевые эпохи</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
