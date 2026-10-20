import { PageHeading } from "@/components/page-heading";
import { HomeLink } from "@/components/home-link";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "О нас — История России для чайников" }];
}

export default function AboutRoute() {
  return (
    <SiteLayout showHomeLink={false}>
      <PageHeading eyebrow="ЛИЦО И ИДЕЯ ПЛАТФОРМЫ" title={<>Учиться красиво.<br /><em>Помнить глубоко.</em></>} afterCopy={<HomeLink inline />}>О проекте и нашей миссии.</PageHeading>
      <section className="founder section-wrap" id="creator">
        <div className="founder-photo"><img src="https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fb02e2d68b7f44d748fd29d625bdeacdd?format=webp&width=720&quality=70" alt="Портрет создателя проекта" loading="lazy" /></div>
        <div className="founder-copy">
          <p className="eyebrow">СОЗДАТЕЛЬ ПРОЕКТА</p>
          <h2>Мария <em>Соколова</em></h2>
          <p className="founder-degree">Историк, автор лекционного проекта</p>
          <ul className="creator-achievements">
            <li>Создала цикл лекций по истории России для широкой аудитории.</li>
            <li>Запустила сообщество #ИсторияРоссииДляЧайников, где делятся любовью к истории.</li>
            <li>Разработала тематические маршруты по ключевым эпохам.</li>
          </ul>
        </div>
      </section>
      <section className="section-wrap page-content" id="mission">
        <p className="eyebrow">МИССИЯ</p>
        <h2>Наша <em>миссия</em></h2>
        <p>Миссия нашего проекта — сохранить историческую память и передать её будущим поколениям. Мы верим, что знание прошлого помогает осознать настоящее и уверенно строить будущее. Наша платформа — это мост между великими страницами истории России и современным человеком.</p>
        <blockquote className="site-dialog-quote">Чем лучше мы знаем прошлое, тем увереннее идём вперёд.</blockquote>
      </section>
    </SiteLayout>
  );
}
