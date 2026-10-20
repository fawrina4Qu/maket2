import { InteractiveRussiaMap } from "@/components/interactive-russia-map";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "Интерактивная карта — История России для чайников" }];
}

export default function MapRoute() {
  return (
    <SiteLayout showHomeLink={false}>
      <InteractiveRussiaMap />
    </SiteLayout>
  );
}
