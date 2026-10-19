import { WelcomeView } from "@/components/welcome-view";

export function meta() {
  return [
    { title: "История России для чайников" },
    { name: "description", content: "Красивое путешествие по истории России начинается здесь." },
  ];
}

export default function HomeRoute() {
  return <WelcomeView />;
}
