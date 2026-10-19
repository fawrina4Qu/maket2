import { allLectures } from "@/lib/lectures";

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

const words = (value: string) => normalize(value).split(/[^a-zа-я0-9]+/).filter(Boolean);

function wordStem(word: string) {
  return word.length >= 5 ? word.slice(0, -1) : word;
}

function matchesQuery(fields: string[], queryWords: string[]) {
  const fieldWords = fields.flatMap(words);
  return queryWords.every((queryWord) => {
    const stem = wordStem(queryWord);
    return fieldWords.some((fieldWord) => fieldWord.startsWith(stem));
  });
}

export function searchSite(query: string): SearchResult[] {
  const queryWords = words(query.trim());
  if (queryWords.length === 0) return [];
  const results: SearchResult[] = [];

  for (const page of pages) {
    if (matchesQuery([page.title, page.text], queryWords)) results.push({ key: `page-${page.to}`, title: page.title, subtitle: page.text, to: page.to });
  }
  for (const lecture of allLectures) {
    if (matchesQuery([lecture.title, lecture.detail], queryWords)) results.push({ key: `lecture-${lecture.sectionId}-${lecture.number}`, title: lecture.title, subtitle: lecture.sectionTitle, to: `/lectures/${lecture.sectionId}#lecture-${lecture.number}` });
  }

  return results.slice(0, 12);
}
