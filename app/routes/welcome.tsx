import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [
    { title: "История России — История России для чайников" },
    { name: "description", content: "Красивое путешествие по истории России начинается здесь." },
  ];
}

export default function WelcomeRoute() {
  return (
    <SiteLayout showCommunity={false} showFooter={false}>
      <section className="hero" id="welcome">
        <div className="hero-image" />
        <div className="hero-content">
          <p className="eyebrow">КРАСИВАЯ ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</p>
          <h1>История<br /><em>России</em></h1>
          <div className="hero-brandline">ДЛЯ ТЕХ, КТО ХОЧЕТ ЗНАТЬ БОЛЬШЕ</div>
          <p className="hero-copy">Великие события, судьбы людей и города, которые меняли страну. Откройте Россию — шаг за шагом и эпоха за эпохой.</p>
          <div className="hero-buttons">
            <Link className="button button-primary" to="/">Начать путешествие <IconArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span>ИСТОРИЯ, КОТОРАЯ ОЖИВАЕТ</span></div>
      </section>
    </SiteLayout>
  );
}
