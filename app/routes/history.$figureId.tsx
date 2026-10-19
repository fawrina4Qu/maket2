import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";
import { historyFigures } from "@/lib/history-figures";

export function meta({ params }: { params: { figureId?: string } }) {
  const figure = historyFigures.find((item) => item.id === params.figureId);
  return [{ title: `${figure?.name ?? "История"} — История России для чайников` }];
}

export default function HistoryFigureRoute() {
  const { figureId } = useParams();
  const figure = historyFigures.find((item) => item.id === figureId);

  if (!figure) {
    return (
      <SiteLayout>
        <PageHeading eyebrow="ИСТОРИЯ РОССИИ ДЛЯ ЧАЙНИКОВ" title={<>Страница не <em>найдена</em></>}>Выберите правителя на главной странице.</PageHeading>
        <section className="section-wrap page-content"><Link className="button button-outline" to="/"><IconArrowLeft size={16} /> На главную</Link></section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="section-wrap page-content history-figure">
        <Link className="lecture-back-link" to="/"><IconArrowLeft size={17} /> На главную</Link>
        <header className="history-figure-header">
          <h1>{figure.name}</h1>
          <p className="history-figure-years">ГОДЫ ЖИЗНИ И ПРАВЛЕНИЯ · {figure.years}</p>
        </header>
        <div className="history-figure-layout">
          <div className="history-figure-sections">
            <p className="history-figure-intro">{figure.intro}</p>
            {figure.sections.map((section) => (
              <article className="history-figure-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.text}>{item.label && <strong>{item.label}: </strong>}{item.text}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          <img className="history-figure-image" src={figure.image} alt={figure.name} />
        </div>
      </section>
    </SiteLayout>
  );
}
