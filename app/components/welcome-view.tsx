import { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { SiteLayout } from "@/components/site-layout";
import { historyFigures } from "@/lib/history-figures";

const collageImages = [
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe1f7e4f697e64bbb904c6829025892b9?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F2d37afa7ae40414b95caac575b7c1764?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fceae985cd9f543bf8e982673ed3b5f4a?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe3998db7d3e04230b5f513ad49bfd32c?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F0cbb1b7069d242e58d0d90e669ec22c1?format=webp&width=800&height=1200",
];

const slides = [
  "https://cdn.builder.io/api/v1/image/assets%2F0dd7a88752e6455cbcf048c9abc741ed%2F4c3256c7e3024ebf93ece5bc5b3fb8d3?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F0dd7a88752e6455cbcf048c9abc741ed%2Fe4fb379449b8426aae1c863246bd1021?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F0dd7a88752e6455cbcf048c9abc741ed%2F118d24e907aa45a4afd93ee160fcf643?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F2e9ffbd5bf8a43088286ef00e3d2bb1b?format=webp&width=800&height=1200",
];

const SLIDE_INTERVAL_MS = 6000;

export function WelcomeView() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <SiteLayout showCommunity={false}>
      <section className="hero" id="welcome">
        <div className="hero-carousel">
          {slides.map((src, index) => (
            <img key={src} className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} src={src} alt="" aria-hidden={index !== activeSlide} />
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
        <div className="community-grid">
          {historyFigures.map((figure, index) => (
            <Link className="community-tile history-tile" to={`/history/${figure.id}`} aria-label={figure.name} key={figure.id}>
              <div className="history-tile-media">
                <img src={collageImages[index]} alt={figure.name} loading="lazy" />
                <span>✿</span>
              </div>
              <p className="history-tile-name">{figure.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
