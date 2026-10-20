import { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { HistoryTiles } from "@/components/history-tiles";
import { SiteLayout } from "@/components/site-layout";

const slides = [
  "https://cdn.builder.io/api/v1/image/assets%2F39261442d7a0458087facbde50780f40%2Fc3322458c9b44cbcaf0fdcb865ee2a51?format=webp&width=640&quality=65",
  "https://cdn.builder.io/api/v1/image/assets%2F39261442d7a0458087facbde50780f40%2Fcdeab4c833aa4db383fdc56a3e92d45e?format=webp&width=640&quality=65",
  "https://cdn.builder.io/api/v1/image/assets%2F39261442d7a0458087facbde50780f40%2Fe68c8b2e32d34dea96641867e96486a9?format=webp&width=640&quality=65",
  "https://cdn.builder.io/api/v1/image/assets%2F39261442d7a0458087facbde50780f40%2Fae05a21cf582441c929fa0ad7ca62c7e?format=webp&width=640&quality=65",
];

const SLIDE_INTERVAL_MS = 6000;

export function WelcomeView() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = slides[(activeSlide + 1) % slides.length];
  }, [activeSlide]);

  return (
    <SiteLayout showCommunity={false} showHomeLink={false}>
      <section className="hero" id="welcome">
        <div className="hero-carousel">
          {slides.map((src, index) => (
            <img key={src} className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} src={index === activeSlide ? src : undefined} alt="" aria-hidden={index !== activeSlide} fetchPriority={index === activeSlide ? "high" : "auto"} />
          ))}
        </div>
        <div className="hero-content">
          <p className="eyebrow">КРАСИВАЯ ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</p>
          <h1>История<br /><em>России</em></h1>
          <div className="hero-brandline">ДЛЯ ТЕХ, КТО ХОЧЕТ ЗНАТЬ БОЛЬШЕ</div>
          <p className="hero-copy">Великие события, судьбы людей и города, которые меняли страну. Откройте Россию — шаг за шагом и эпоха за эпохой.</p>
          <div className="hero-buttons">
            <Link className="button button-primary" to="/journey">Начать путешествие <IconArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button key={index} type="button" className={index === activeSlide ? "is-active" : undefined} onClick={() => setActiveSlide(index)} aria-label={`Слайд ${index + 1}`} />
          ))}
        </div>
        <div className="hero-caption"><span>{String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><span>ИСТОРИЯ, КОТОРАЯ ОЖИВАЕТ</span></div>
      </section>
      <section className="community section-wrap" id="history">
        <div className="section-heading">
          <div><p className="eyebrow">МЫ УЧИМСЯ ВМЕСТЕ</p><h2>История России <em>для чайников</em></h2><p className="section-sub">История становится ближе, когда ей делятся.</p></div>
        </div>
        <HistoryTiles />
      </section>
    </SiteLayout>
  );
}
