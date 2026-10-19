import { courses, popular } from "@/lib/catalog";
import { allLectures, lectureSections } from "@/lib/lectures";

export interface SearchResult {
  key: string;
  title: string;
  subtitle: string;
  to: string;
}

const pages = [
  { title: "Новинки", text: "Недавно добавленные лекции по истории России.", to: "/new" },
  { title: "Ключевые эпохи", text: "От древних городов и княжеств — к империи и культурным переменам.", to: "/eras" },
  { title: "Интерактивная карта", text: "Карта России с историческими событиями.", to: "/map" },
  { title: "О нас", text: "О проекте и нашей миссии.", to: "/about" },
  { title: "Наша миссия", text: "Сохранить историческую память и передать её будущим поколениям.", to: "/about#mission" },
];

const normalize = (value: string) => value.toLowerCase().replace(/ё/g, "е");

export function searchSite(query: string): SearchResult[] {
  const needle = normalize(query.trim());
  if (!needle) return [];
  const matches = (...fields: string[]) => fields.some((field) => normalize(field).includes(needle));
  const results: SearchResult[] = [];

  for (const page of pages) {
    if (matches(page.title, page.text)) results.push({ key: `page-${page.to}`, title: page.title, subtitle: page.text, to: page.to });
  }
  for (const section of lectureSections) {
    if (matches(section.title, section.description, section.era)) results.push({ key: `section-${section.id}`, title: section.title, subtitle: section.era, to: `/lectures/${section.id}` });
  }
  for (const lecture of allLectures) {
    if (matches(lecture.title, lecture.detail)) results.push({ key: `lecture-${lecture.sectionId}-${lecture.number}`, title: lecture.title, subtitle: lecture.sectionTitle, to: `/lectures/${lecture.sectionId}#lecture-${lecture.number}` });
  }
  for (const course of courses) {
    if (matches(course.title, course.detail, course.category)) results.push({ key: `course-${course.title}`, title: course.title, subtitle: course.detail, to: "/favorites" });
  }
  for (const [number, title] of popular) {
    if (matches(title)) results.push({ key: `popular-${number}`, title, subtitle: "Любимые курсы", to: "/favorites" });
  }

  return results.slice(0, 12);
}
