import { useEffect, useRef, useState } from "react";
import { IconArrowRight, IconFlower, IconX } from "@tabler/icons-react";
import { HomeLink } from "@/components/home-link";

const mapCities = [
  {
    title: "Москва",
    top: 63,
    left: 22,
    founded: "1147 г.",
    history: "Московское княжество",
    image: "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fc1ba7c66eb1347a492d1bbaa49589a5c?format=webp&width=400&quality=65",
    facts: [
      "Юрий Долгорукий считается основателем Москвы.",
      "В 1812 году Москва была занята Наполеоном.",
      "Первое летописное упоминание датируется 1147 годом.",
    ],
  },
  {
    title: "Санкт-Петербург",
    top: 47,
    left: 17,
    founded: "1703 г.",
    history: "Швеция (Ингерманландия)",
    facts: [
      "Город основан Петром I.",
      "Санкт-Петербург был столицей империи более 200 лет.",
      "Здесь находится один из самых глубоких метрополитенов в мире.",
    ],
  },
  {
    title: "Казань",
    top: 65,
    left: 33,
    founded: "1005 г.",
    history: "Казанское ханство",
    facts: [
      "В 1552 году Казань была взята войсками Ивана Грозного.",
      "Сегодня это крупный научный центр.",
      "Казанский Кремль входит в список объектов Всемирного наследия ЮНЕСКО.",
    ],
  },
  {
    title: "Екатеринбург",
    top: 60,
    left: 43,
    founded: "1723 г.",
    history: "Уральские земли",
    facts: [
      "Город основан по указу Петра I.",
      "Рядом проходит условная граница Европы и Азии.",
      "В 1918 году в Екатеринбурге была расстреляна царская семья.",
    ],
  },
  {
    title: "Новосибирск",
    top: 62,
    left: 58,
    founded: "1893 г.",
    history: "Сибирский край",
    facts: [
      "Это самый большой город Сибири.",
      "Город появился благодаря строительству Транссибирской магистрали.",
      "Новосибирский метромост — один из самых длинных в мире.",
    ],
  },
  {
    title: "Якутск",
    top: 48,
    left: 72,
    founded: "1632 г.",
    history: "Якутское ханство",
    facts: [
      "Якутск — крупнейший город в зоне вечной мерзлоты.",
      "Зимой температура может опускаться ниже −50 °C.",
      "В городе работает Институт мерзлотоведения.",
    ],
  },
  {
    title: "Владивосток",
    top: 72,
    left: 88,
    founded: "1860 г.",
    history: "Китай (Маньчжурия)",
    facts: [
      "Владивосток был основан как военный пост.",
      "Здесь находится штаб Тихоокеанского флота.",
      "Расстояние до Москвы составляет около 9 000 км.",
    ],
  },
];

const mapImage =
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F6fef30a8b1b54fe5b423930537929011?format=webp&width=640&quality=60";

type MapCity = (typeof mapCities)[number];

export function InteractiveRussiaMap() {
  const [selectedCity, setSelectedCity] = useState<MapCity | null>(null);
  const [factIndex, setFactIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedCity && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [selectedCity]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <section className="map-section" id="map">
      <div className="section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ГОРОДА И СОБЫТИЯ</p>
            <h2>Интерактивная <em>карта</em></h2>
          </div>
          <p className="map-intro">Нажмите на отметку, чтобы открыть короткую историю города.</p>
        </div>
        <HomeLink inline />
        <div className="map-paper">
          <div className="map-stage">
            <img src={mapImage} alt="Карта России с отмеченными городами" />
            {mapCities.map((city) => (
              <button
                key={city.title}
                className={`map-point${selectedCity?.title === city.title ? " selected" : ""}`}
                style={{ top: `${city.top}%`, left: `${city.left}%` }}
                onClick={() => {
                  setSelectedCity(city);
                  setFactIndex(0);
                }}
                aria-label={`Показать историю города ${city.title}`}
                aria-pressed={selectedCity?.title === city.title}
              >
                <span className="map-point-label">{city.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="map-popup"
        onClose={() => setSelectedCity(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {selectedCity && (
          <>
            <button className="map-popup-close" onClick={closeDialog} aria-label="Закрыть окно">
              <IconX size={19} />
            </button>
            <div className="map-detail-top">
              <span>ГОРОД НА КАРТЕ</span>
              <span className="map-detail-ornament">✳</span>
            </div>
            <h3>{selectedCity.title}</h3>
            {selectedCity.image && (
              <img className="map-city-image" src={selectedCity.image} alt={selectedCity.title} />
            )}
            <dl>
              <div>
                <dt>Год основания</dt>
                <dd>{selectedCity.founded}</dd>
              </div>
              <div>
                <dt>Историческая территория</dt>
                <dd>{selectedCity.history}</dd>
              </div>
            </dl>
            <p className="map-fact">{selectedCity.facts[factIndex]}</p>
            <button
              className="map-next-fact"
              onClick={() => setFactIndex((index) => (index + 1) % selectedCity.facts.length)}
            >
              Ещё факт <IconArrowRight size={16} />
            </button>
          </>
        )}
      </dialog>
    </section>
  );
}
