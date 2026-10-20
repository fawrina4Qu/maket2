import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as Icons from "@tabler/icons-react";
import { allLectures, lectureSections, newLectures, type Lecture, type LectureSection } from "../app/lib/lectures.ts";
import { historyFigures, type HistoryFigure } from "../app/lib/history-figures.ts";
import { blocks as romanovBlocks } from "./romanov.ts";
import { mapCities, mapImage } from "./map.ts";
import { slides } from "./slides.ts";
import { collageImages } from "./collage.ts";
import { searchPages } from "./search-pages.ts";
import { pages as pagesEastern, videoUrl as videoEastern } from "./notes-eastern-slavs.ts";
import { pages as pagesVladimir, videoUrl as videoVladimir } from "./notes-vladimir-baptism.ts";
import { pages as pagesYaroslav, videoUrl as videoYaroslav } from "./notes-yaroslav-wise.ts";
import { pages as pagesOlga, videoUrl as videoOlga } from "./notes-olga-svyatoslav.ts";

const ROOT = join(import.meta.dirname, "..");

type IconName = keyof typeof Icons;
function icon(name: IconName, props: Record<string, unknown> = {}): string {
  const Component = Icons[name] as unknown as ComponentType<Record<string, unknown>>;
  return renderToStaticMarkup(createElement(Component, props));
}

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function write(relPath: string, content: string) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

function srcsIn(relPath: string): string[] {
  const text = readFileSync(join(ROOT, relPath), "utf8");
  return [...text.matchAll(/src="(https:\/\/cdn\.builder\.io[^"]+)"/g)].map((match) => match[1]);
}

const SITE_TITLE = "История России для чайников";
const ERAS_IMAGES = srcsIn("app/routes/eras.tsx");
const ABOUT_PHOTO = srcsIn("app/routes/about.tsx")[0];

function isActive(to: string, path: string): boolean {
  if (to === "/") return true;
  return path === to || path.startsWith(`${to}/`);
}

function navAttrs(to: string, path: string): string {
  return isActive(to, path) ? ` class="active" aria-current="page"` : "";
}

const NAV_LINKS = [
  { label: "Новинки", to: "/new" },
  { label: "Интерактивная карта", to: "/map" },
  { label: "Лекции", to: "/lectures" },
  { label: "Ключевые эпохи", to: "/eras" },
  { label: "О нас", to: "/about" },
];

function siteHeader(path: string): string {
  const nav = NAV_LINKS.map((link) => `<a href="${link.to}"${navAttrs(link.to, path)}>${link.label}</a>`).join("");
  return `<div class="topline">Первая лекция бесплатно <span>✦</span> Скидка 10% на первый курс по промокоду <a href="/login?promo=HIST_CHAINIK"><strong>HIST_CHAINIK</strong></a></div>
<header class="site-header">
<a class="brand site-name active" title="На главную" href="/" aria-current="page"><span class="brand-mark">✿</span><span>История России <i>для чайников</i></span></a>
<nav class="main-nav" aria-label="Меню">${nav}</nav>
<div class="header-actions">
<div class="header-search">
<button aria-label="Открыть поиск" aria-expanded="false">${icon("IconSearch")}</button>
</div>
<a class="header-login" href="/login" title="Войти">Войти</a>
</div>
</header>`;
}

function footer(): string {
  return `<footer class="site-footer" id="footer">
<div class="footer-main section-wrap">
<div class="footer-brand"><a class="brand site-name active" href="/" aria-current="page"><span class="brand-mark">✿</span><span>История России <i>для чайников</i></span></a><p>История в розовом свете.</p><span class="footer-copyright">© 2025 ИСТОРИЯ РОССИИ</span></div>
<div class="footer-column"><h3>Контакты</h3><p>+7 (495) 318-27-64</p><p>hello@istoriya-chaynikov.ru</p><p>Москва, ул. Лесная, 14, оф. 302</p><button type="button" class="footer-column-button">Обратная связь</button></div>
<div class="footer-newsletter"><h3>Письма с историей</h3><p>Красивые открытия и новые лекции — раз в неделю.</p><form><input type="email" required placeholder="Ваш email" aria-label="Ваш email" /><button type="submit" aria-label="Подписаться">${icon("IconArrowRight")}</button></form><small>Подписываясь, вы соглашаетесь с политикой конфиденциальности.</small></div>
</div>
<div class="footer-bottom section-wrap"><span>СОЗДАНО С ЛЮБОВЬЮ К ИСТОРИИ</span><span>МОСКВА · ВЕЗДЕ</span><a href="/">НАВЕРХ ↑</a></div>
</footer>`;
}

function historyTiles(): string {
  const tiles = historyFigures.map(
    (figure: HistoryFigure, index: number) =>
      `<a class="community-tile history-tile" href="/history/${figure.id}" aria-label="${esc(figure.name)}"><div class="history-tile-media"><img src="${collageImages[index]}" alt="${esc(figure.name)}" loading="lazy" /><span>✿</span></div><p class="history-tile-name">${esc(figure.name)}</p></a>`,
  );
  return `<div class="community-grid">${tiles.join("")}</div>`;
}

function communitySection(id?: string): string {
  return `<section class="community section-wrap"${id ? ` id="${id}"` : ""}>
<div class="section-heading">
<div><p class="eyebrow">МЫ УЧИМСЯ ВМЕСТЕ</p><h2>История России <em>для чайников</em></h2><p class="section-sub">История становится ближе, когда ей делятся.</p></div>
</div>
${historyTiles()}
</section>`;
}

function homeLinkRow(): string {
  return `<div class="section-wrap home-link-row"><a class="lecture-back-link" href="/">${icon("IconArrowLeft", { size: 17 })} На главную</a></div>`;
}

function homeLinkInline(): string {
  return `<div class="home-link-inline"><a class="lecture-back-link" href="/">${icon("IconArrowLeft", { size: 17 })} На главную</a></div>`;
}

function siteLayout(opts: {
  path: string;
  children: string;
  showCommunity?: boolean;
  showFooter?: boolean;
  showHomeLink?: boolean;
}): string {
  const { path, children, showCommunity = true, showFooter = true, showHomeLink = true } = opts;
  return `<div class="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground"><div class="agent-native-app-main min-w-0 flex-1 overflow-y-auto overscroll-contain"><div class="blossom-site">
${siteHeader(path)}
<main class="site-page-content">${showHomeLink ? homeLinkRow() : ""}${children}</main>
${showCommunity ? communitySection() : ""}
${showFooter ? footer() : ""}
</div></div></div>`;
}

function pageHeading(opts: { eyebrow: string; title: string; copy?: string; after?: string }): string {
  return `<header class="page-heading section-wrap"><p class="eyebrow">${opts.eyebrow}</p><h1>${opts.title}</h1>${opts.copy ? `<p class="page-heading-copy">${esc(opts.copy)}</p>` : ""}${opts.after ?? ""}</header>`;
}

function lectureGrid(lectures: Lecture[]): string {
  const cards = lectures.map((lecture, index) => {
    const image = `<img src="${lecture.image}" alt="${esc(`Иллюстрация: ${lecture.title}`)}" loading="lazy" />`;
    const media = lecture.to
      ? `<a class="lecture-image-link" href="${lecture.to}" aria-label="${esc(`Открыть конспект: ${lecture.title}`)}">${image}</a>`
      : image;
    return `<article class="lecture-card" id="lecture-${index + 1}"><div class="lecture-image">${media}${lecture.isNew ? `<span class="lecture-tag">НОВАЯ ЛЕКЦИЯ</span>` : ""}<button class="lecture-favorite" aria-label="${esc(`Добавить «${lecture.title}» в избранное`)}" aria-pressed="false">${icon("IconHeart", { size: 19 })}</button><span class="lecture-number">${String(index + 1).padStart(2, "0")}</span></div><div class="lecture-info"><h2>${esc(lecture.title)}</h2><p>${esc(lecture.detail)}</p><span class="lecture-meta">ИСТОРИЯ РОССИИ</span></div></article>`;
  });
  return `<div class="lecture-grid">${cards.join("")}</div>`;
}

function homePage(path: string): string {
  const slideMarkup = slides
    .map(
      (src, index) =>
        `<img class="${index === 0 ? "hero-slide is-active" : "hero-slide"}"${index === 0 ? ` src="${src}"` : ""} alt="" aria-hidden="${index !== 0}" fetchpriority="${index === 0 ? "high" : "auto"}" />`,
    )
    .join("");
  const dots = slides
    .map((_, index) => `<button type="button"${index === 0 ? ` class="is-active"` : ""} aria-label="Слайд ${index + 1}"></button>`)
    .join("");
  const hero = `<section class="hero" id="welcome">
<div class="hero-carousel">${slideMarkup}</div>
<div class="hero-content">
<p class="eyebrow">КРАСИВАЯ ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</p>
<h1>История<br /><em>России</em></h1>
<div class="hero-brandline">ДЛЯ ТЕХ, КТО ХОЧЕТ ЗНАТЬ БОЛЬШЕ</div>
<p class="hero-copy">Великие события, судьбы людей и города, которые меняли страну. Откройте Россию — шаг за шагом и эпоху за эпохой.</p>
<div class="hero-buttons"><a class="button button-primary" href="/journey">Начать путешествие ${icon("IconArrowRight", { size: 17 })}</a></div>
</div>
<div class="hero-dots">${dots}</div>
<div class="hero-caption"><span>01 / ${String(slides.length).padStart(2, "0")}</span><span>ИСТОРИЯ, КОТОРАЯ ОЖИВАЕТ</span></div>
</section>`;
  return siteLayout({
    path,
    showCommunity: false,
    showHomeLink: false,
    children: `${hero}\n${communitySection("history")}`,
  });
}

function journeyPage(path: string): string {
  const destinations = [
    {
      to: "/lectures",
      title: "Все лекции",
      icon: "IconBooks" as IconName,
      text: "От призвания варягов до наших дней: короткие и понятные лекции о каждом веке, событии и правителе. Читайте по порядку или выбирайте тему, которая вас интересует.",
    },
    {
      to: "/map",
      title: "Интерактивная карта",
      icon: "IconMap2" as IconName,
      text: "Смотрите, как менялась территория страны и где происходили главные события. Выбирайте город или регион и узнавайте, что там произошло.",
    },
    {
      to: "/eras",
      title: "Ключевые эпохи",
      icon: "IconHourglass" as IconName,
      text: "Путешествие по главным периодам российской истории: от древних княжеств до империи Романовых. Каждая эпоха — это история с контекстом, героями и последствиями.",
    },
  ];
  const blocks = destinations
    .map(
      (d) =>
        `<a class="journey-block" href="${d.to}"><span class="journey-icon">${icon(d.icon, { size: 34, stroke: 1.5 })}</span><h2>${d.title}</h2><p>${esc(d.text)}</p></a>`,
    )
    .join("");
  return siteLayout({
    path,
    showCommunity: false,
    showHomeLink: false,
    children: `<section class="journey-page section-wrap">${homeLinkInline()}<div class="journey-grid">${blocks}</div></section>`,
  });
}

function newPage(path: string): string {
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: "СВЕЖИЕ МАТЕРИАЛЫ",
      title: "Новые <em>лекции</em>",
      copy: "Недавно добавленные лекции по истории России.",
      after: homeLinkInline(),
    })}
<section class="section-wrap page-content">${lectureGrid(newLectures)}</section>`,
  });
}

function mapPage(path: string): string {
  const points = mapCities
    .map(
      (city) =>
        `<button class="map-point" style="top: ${city.top}%; left: ${city.left}%;" aria-label="${esc(`Показать историю города ${city.title}`)}" aria-pressed="false"><span class="map-point-label">${esc(city.title)}</span></button>`,
    )
    .join("");
  return siteLayout({
    path,
    showHomeLink: false,
    children: `<section class="map-section" id="map">
<div class="section-wrap">
<div class="section-heading">
<div>
<p class="eyebrow">ГОРОДА И СОБЫТИЯ</p>
<h2>Интерактивная <em>карта</em></h2>
</div>
<p class="map-intro">Нажмите на отметку, чтобы открыть короткую историю города.</p>
</div>
${homeLinkInline()}
<div class="map-paper">
<div class="map-stage">
<img src="${mapImage}" alt="Карта России с отмеченными городами" />
${points}
</div>
</div>
</div>
<dialog class="map-popup"></dialog>
</section>`,
  });
}

function lecturesIndexPage(path: string): string {
  const cards = lectureSections
    .map(
      (section: LectureSection, index: number) =>
        `<a class="lecture-section-card" href="/lectures/${section.id}"><span class="lecture-section-number">РАЗДЕЛ 0${index + 1}</span><span class="lecture-section-era">${esc(section.era)}</span><h2>${esc(section.title)}</h2><p>${esc(section.description)}</p><span class="lecture-section-footer">${section.lectures.length} лекций ${icon("IconArrowRight", { size: 17 })}</span></a>`,
    )
    .join("");
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: "ЛЕКЦИИ ПО ЭПОХАМ",
      title: "История по <em>разделам</em>",
      copy: "Выберите период, чтобы открыть подборку лекций и пройти путь от первых князей до современной России.",
      after: homeLinkInline(),
    })}
<section class="lecture-sections section-wrap page-content">${cards}</section>`,
  });
}

function lectureSectionPage(path: string, section: LectureSection): string {
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: `${esc(section.era)} · ${section.lectures.length} ЛЕКЦИЙ`,
      title: `${esc(section.title)} <em>${esc(section.era)}</em>`,
      copy: section.description,
      after: homeLinkInline(),
    })}
<section class="section-wrap page-content"><a class="lecture-back-link" href="/lectures">${icon("IconArrowLeft", { size: 17 })} Все разделы лекций</a>${lectureGrid(section.lectures)}</section>`,
  });
}

function erasPage(path: string): string {
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: "ПУТЕШЕСТВИЕ СКВОЗЬ ВРЕМЯ",
      title: "Ключевые <em>эпохи</em>",
      copy: "От древних городов и княжеств — к империи и культурным переменам.",
      after: homeLinkInline(),
    })}
<section class="eras-section eras-page"><div class="section-wrap"><div class="era-grid">
<a class="era-card era-one" href="/lectures/moscow-state"><img src="${ERAS_IMAGES[0]}" alt="Старинная Москва" /><div class="era-number">01 / 02</div><div class="era-card-copy"><span>XII — XVII ВЕК</span><h2>Московское<br />царство</h2><p>От Ивана Калиты до Смутного времени.</p><b>ИЗУЧИТЬ ЭПОХУ <span>→</span></b></div></a>
<a class="era-card era-two" href="/lectures/russian-empire"><img src="${ERAS_IMAGES[1]}" alt="Семья Романовых" /><div class="era-number">02 / 02</div><div class="era-card-copy"><span>1613 — 1917</span><h2>Империя<br />Романовых</h2><p>Золотой век русской культуры и государственности.</p><b>ИЗУЧИТЬ ЭПОХУ <span>→</span></b></div></a>
</div></div></section>`,
  });
}

function romanovPage(path: string): string {
  const blocks = romanovBlocks
    .map((block, blockIndex) => {
      const iconSpan = block.icon ? `<span aria-hidden="true">${block.icon} </span>` : "";
      const period = block.period ? ` (${esc(block.period)})` : "";
      const topics = block.topics
        .map((topic) => `<li class="romanov-topic"><h3>${esc(topic.name)}</h3><p>${esc(topic.text)}</p></li>`)
        .join("");
      return `<div class="romanov-block"><header class="romanov-block-head"><span class="romanov-block-number">${String(blockIndex + 1).padStart(2, "0")}</span><h2>${iconSpan}Блок ${blockIndex + 1}: ${esc(block.title)}${period}</h2></header><ul class="romanov-topics">${topics}</ul></div>`;
    })
    .join("");
  return siteLayout({
    path,
    children: `${pageHeading({
      eyebrow: "1613 — 1917",
      title: "Империя <em>Романовых</em>",
      copy: "Золотой век русской культуры и государственности: от Смуты до падения монархии.",
    })}
<section class="section-wrap romanov-page"><a class="lecture-back-link" href="/eras">${icon("IconArrowLeft", { size: 17 })} Все эпохи</a>${blocks}</section>`,
  });
}

function aboutPage(path: string): string {
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: "ЛИЦО И ИДЕЯ ПЛАТФОРМЫ",
      title: "Учиться красиво.<br /><em>Помнить глубоко.</em>",
      copy: "О проекте и нашей миссии.",
      after: homeLinkInline(),
    })}
<section class="founder section-wrap about-founder" id="creator">
<div class="founder-photo"><img src="${ABOUT_PHOTO}" alt="Портрет создателя проекта" loading="lazy" /></div>
<div class="founder-copy">
<p class="eyebrow">СОЗДАТЕЛЬ ПРОЕКТА</p>
<h2>Мария <em>Соколова</em></h2>
<p class="founder-degree">Историк, автор лекционного проекта</p>
<ul class="creator-achievements">
<li>Создала цикл лекций по истории России для широкой аудитории.</li>
<li>Запустила сообщество #ИсторияРоссииДляЧайников, где делятся любовью к истории.</li>
<li>Разработала тематические маршруты по ключевым эпохам.</li>
</ul>
</div>
</section>
<section class="section-wrap page-content" id="mission">
<p class="eyebrow">МИССИЯ</p>
<h2>Наша <em>миссия</em></h2>
<p>Миссия нашего проекта — сохранить историческую память и передать её будущим поколениям. Мы верим, что знание прошлого помогает осознать настоящее и уверенно строить будущее. Наша платформа — это мост между великими страницами истории России и современным человеком.</p>
<blockquote class="site-dialog-quote">Чем лучше мы знаем прошлое, тем увереннее идём вперёд.</blockquote>
</section>`,
  });
}

function historyFigurePage(path: string, figure: HistoryFigure): string {
  const sections = figure.sections
    .map((section) => {
      const paragraphs = (section.paragraphs ?? []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("");
      const items = section.items
        ? `<ul>${section.items
            .map((item) => `<li>${item.label ? `<strong>${esc(item.label)}: </strong>` : ""}${esc(item.text)}</li>`)
            .join("")}</ul>`
        : "";
      return `<article class="history-figure-section"><h2>${esc(section.title)}</h2>${paragraphs}${items}</article>`;
    })
    .join("");
  return siteLayout({
    path,
    showHomeLink: false,
    children: `<header class="figure-hero" style="background-image: url(${figure.image})"><div class="figure-hero-content section-wrap"><h1>${esc(figure.name)}</h1><p class="figure-hero-years">ГОДЫ ЖИЗНИ И ПРАВЛЕНИЯ · ${esc(figure.years)}</p></div></header>
<section class="section-wrap page-content history-figure"><div class="history-figure-layout"><div class="history-figure-sections">${homeLinkInline()}<p class="history-figure-intro">${esc(figure.intro)}</p>${sections}</div></div></section>`,
  });
}

interface NotesPage {
  title: string;
  paragraphs: string[];
  items: { label: string; text: string }[];
}

interface NotesConfig {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  ariaLabel: string;
  iframeTitle: string;
  video: string;
  pages: NotesPage[];
}

function notesPageInner(pages: NotesPage[], index: number): string {
  const page = pages[index];
  const paragraphs = page.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("");
  const items = page.items.length
    ? `<ul>${page.items.map((item) => `<li><strong>${esc(item.label)}:</strong> ${esc(item.text)}</li>`).join("")}</ul>`
    : "";
  return `<p class="eyebrow">СТРАНИЦА ${index + 1} ИЗ ${pages.length}</p><h2>${esc(page.title)}</h2>${paragraphs}${items}`;
}

function notesPage(path: string, config: NotesConfig): string {
  const numbers = config.pages
    .map((page, index) => {
      const active = index === 0;
      return `<button type="button" class="${active ? "slavic-notes-number is-active" : "slavic-notes-number"}" aria-label="${esc(`Страница ${index + 1}: ${page.title}`)}"${active ? ` aria-current="page"` : ""}>${index + 1}</button>`;
    })
    .join("");
  return siteLayout({
    path,
    showHomeLink: false,
    children: `${pageHeading({
      eyebrow: config.eyebrow,
      title: config.title,
      copy: config.copy,
      after: homeLinkInline(),
    })}
<section class="slavic-notes section-wrap" aria-label="${esc(config.ariaLabel)}" data-notes="${config.id}">
<a class="lecture-back-link" href="/lectures/ancient-rus">${icon("IconArrowLeft", { size: 17 })} Все лекции Древней Руси</a>
<figure class="slavic-notes-video"><iframe src="${config.video}" title="${esc(config.iframeTitle)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>
<section class="slavic-notes-page" aria-live="polite">${notesPageInner(config.pages, 0)}</section>
<nav class="slavic-notes-pagination" aria-label="Страницы конспекта"><button type="button" class="slavic-notes-arrow" aria-label="Предыдущая страница">${icon("IconArrowLeft", { size: 18 })}</button>${numbers}<button type="button" class="slavic-notes-arrow" aria-label="Следующая страница">${icon("IconArrowRight", { size: 18 })}</button></nav>
</section>`,
  });
}

const NOTES: Record<string, NotesConfig> = {
  "eastern-slavs": {
    id: "eastern-slavs",
    eyebrow: "КОНСПЕКТ · ДРЕВНЯЯ РУСЬ",
    title: "Восточные <em>славяне</em>",
    copy: "Происхождение и расселение восточных славян.",
    ariaLabel: "Конспект: Восточные славяне",
    iframeTitle: "Видео о восточных славянах",
    video: videoEastern,
    pages: pagesEastern,
  },
  "vladimir-baptism": {
    id: "vladimir-baptism",
    eyebrow: "КОНСПЕКТ · ДРЕВНЯЯ РУСЬ",
    title: "Крещение Руси и правление <em>Владимира Святого</em>",
    copy: "Крещение Руси в 988 году, правление Владимира Святого, причины и последствия принятия христианства.",
    ariaLabel: "Конспект: Крещение Руси и правление Владимира Святого",
    iframeTitle: "Видео о крещении Руси и правлении Владимира Святого",
    video: videoVladimir,
    pages: pagesVladimir,
  },
  "yaroslav-wise": {
    id: "yaroslav-wise",
    eyebrow: "КОНСПЕКТ · ДРЕВНЯЯ РУСЬ",
    title: "Правление <em>Ярослава Мудрого</em>",
    copy: "Русская Правда, укрепление государства и династические браки.",
    ariaLabel: "Конспект: Правление Ярослава Мудрого",
    iframeTitle: "Видео о правлении Ярослава Мудрого",
    video: videoYaroslav,
    pages: pagesYaroslav,
  },
  "olga-svyatoslav": {
    id: "olga-svyatoslav",
    eyebrow: "КОНСПЕКТ · ДРЕВНЯЯ РУСЬ",
    title: "Правление Ольги и <em>Святослава</em>",
    copy: "Налоговая реформа Ольги и разгром Хазарского каганата Святославом.",
    ariaLabel: "Конспект: Правление Ольги и Святослава",
    iframeTitle: "Видео о правлении Ольги и Святослава",
    video: videoOlga,
    pages: pagesOlga,
  },
};

function loginPage(): string {
  const source = readFileSync(join(ROOT, "server/plugins/auth.ts"), "utf8");
  const start = source.indexOf("const loginHtml = `") + "const loginHtml = `".length;
  const end = source.indexOf("</html>`;", start) + "</html>".length;
  let html = source.slice(start, end);
  const scriptStart = html.indexOf("<script>${signInJourneyInlineScript()}</script>");
  const scriptEnd = html.indexOf("</body>");
  if (scriptStart < 0 || scriptEnd < 0) throw new Error("login template markers not found");
  html = `${html.slice(0, scriptStart)}<script src="/js/auth.js"></script>\n  <script src="/js/login.js"></script>\n${html.slice(scriptEnd)}`;
  return html;
}

function renderDocument(opts: { title: string; description?: string; body: string; scripts?: string[]; headExtra?: string }): string {
  const scripts = (opts.scripts ?? []).map((src) => `<script src="${src}"></script>`).join("\n");
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<script>(function(){var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var t=d?'dark':'light';var r=document.documentElement;r.classList.add(t);r.setAttribute('data-theme',t);r.style.colorScheme=t;})();</script>
<meta name="theme-color" content="#18181B" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="${SITE_TITLE}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/icon-180.svg" />
<title>${esc(opts.title)}</title>
${opts.description ? `<meta name="description" content="${esc(opts.description)}" />` : ""}
<link rel="stylesheet" href="/css/site.css" />
${opts.headExtra ?? ""}
</head>
<body>
${opts.body}
<script src="/js/data.js"></script>
<script src="/js/icons.js"></script>
<script src="/js/auth.js"></script>
<script src="/js/site.js"></script>
${scripts}
</body>
</html>
`;
}

const HOME_DESCRIPTION = "Красивое путешествие по истории России начинается здесь.";
const HOME_REDIRECT = `<script>(function(){try{if(location.pathname==='/'&&localStorage.getItem('site-session')){location.replace('/welcome'+location.search+location.hash);}}catch(e){}})();</script>`;

write(
  "index.html",
  renderDocument({ title: SITE_TITLE, description: HOME_DESCRIPTION, body: homePage("/"), scripts: ["/js/home.js"], headExtra: HOME_REDIRECT }),
);
write(
  "welcome/index.html",
  renderDocument({ title: `История России — ${SITE_TITLE}`, description: HOME_DESCRIPTION, body: homePage("/welcome"), scripts: ["/js/home.js"] }),
);
write("journey/index.html", renderDocument({ title: `Начать путешествие — ${SITE_TITLE}`, body: journeyPage("/journey") }));
write("new/index.html", renderDocument({ title: `Новинки — ${SITE_TITLE}`, body: newPage("/new") }));
write("map/index.html", renderDocument({ title: `Интерактивная карта — ${SITE_TITLE}`, body: mapPage("/map"), scripts: ["/js/map.js"] }));
write("lectures/index.html", renderDocument({ title: `Лекции — ${SITE_TITLE}`, body: lecturesIndexPage("/lectures") }));

for (const section of lectureSections) {
  write(
    `lectures/${section.id}/index.html`,
    renderDocument({ title: `Раздел лекций — ${SITE_TITLE}`, body: lectureSectionPage(`/lectures/${section.id}`, section) }),
  );
}

for (const id of Object.keys(NOTES)) {
  const config = NOTES[id];
  write(
    `lectures/${id}/index.html`,
    renderDocument({ title: `${{ "eastern-slavs": "Восточные славяне", "vladimir-baptism": "Крещение Руси и Владимир Святой", "yaroslav-wise": "Правление Ярослава Мудрого", "olga-svyatoslav": "Ольга и Святослав" }[id]} — конспект`, body: notesPage(`/lectures/${id}`, config), scripts: ["/js/notes.js"] }),
  );
}

write("eras/index.html", renderDocument({ title: `Ключевые эпохи — ${SITE_TITLE}`, body: erasPage("/eras") }));
write("eras/romanov/index.html", renderDocument({ title: `Империя Романовых — ${SITE_TITLE}`, body: romanovPage("/eras/romanov") }));
write("about/index.html", renderDocument({ title: `О нас — ${SITE_TITLE}`, body: aboutPage("/about") }));

for (const figure of historyFigures) {
  write(
    `history/${figure.id}/index.html`,
    renderDocument({ title: `${figure.name} — ${SITE_TITLE}`, body: historyFigurePage(`/history/${figure.id}`, figure) }),
  );
}

write("login/index.html", loginPage());

write(
  "404.html",
  renderDocument({
    title: `Страница не найдена — ${SITE_TITLE}`,
    body: `<main class="flex items-center justify-center min-h-screen p-4 bg-background text-foreground"><div class="flex flex-col items-center text-center max-w-md"><h1 class="mt-3 text-2xl font-semibold">Страница не найдена</h1><p class="mt-2 text-muted-foreground text-sm">По этому адресу ничего нет.</p><div class="mt-6 flex flex-col items-center gap-2"><a href="/" class="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer">На главную</a></div></div></main>`,
  }),
);

const ICON_SET = {
  search: icon("IconSearch"),
  headerClose: icon("IconX"),
  favClose: icon("IconX", { size: 20 }),
  mapClose: icon("IconX", { size: 19 }),
  heart: icon("IconHeart"),
  logout: icon("IconLogout2"),
  arrowRight16: icon("IconArrowRight", { size: 16 }),
  arrowLeft16: icon("IconArrowLeft", { size: 16 }),
};
write("js/icons.js", `window.SITE_ICONS = ${JSON.stringify(ICON_SET, null, 2)};\n`);

const DATA = {
  lectureSections,
  allLectures: allLectures.map(({ title, detail, sectionId, sectionTitle, number }) => ({ title, detail, sectionId, sectionTitle, number })),
  searchPages,
  mapCities,
  slides,
  notes: Object.fromEntries(Object.entries(NOTES).map(([id, config]) => [id, config.pages])),
};
write("js/data.js", `window.SITE_DATA = ${JSON.stringify(DATA)};\n`);
