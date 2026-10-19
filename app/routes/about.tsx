import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import { PageHeading } from "@/components/page-heading";
import { SiteLayout } from "@/components/site-layout";

export function meta() {
  return [{ title: "О нас — История России для чайников" }];
}

export default function AboutRoute() {
  return (
    <SiteLayout>
      <PageHeading eyebrow="ЛИЦО И ИДЕЯ ПЛАТФОРМЫ" title={<>Учиться красиво.<br /><em>Помнить глубоко.</em></>}>О проекте и его основателе.</PageHeading>
      <section className="founder section-wrap" id="founder">
        <div className="founder-photo"><img src="https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fb02e2d68b7f44d748fd29d625bdeacdd?format=webp&width=800&height=1200" alt="Анна Романова, основатель платформы" /><div className="photo-note">ИССЛЕДУЕМ ПРОШЛОЕ<br />С ЛЮБОВЬЮ К ДЕТАЛЯМ</div></div>
        <div className="founder-copy"><p className="eyebrow">ОСНОВАТЕЛЬ ПЛАТФОРМЫ</p><h2>Анна <em>Романова</em></h2><p className="founder-degree">Доктор исторических наук</p><div className="gold-rule" /><p className="founder-quote">«История — это не только даты. Это эмоции, которые мы можем почувствовать. Платформа создана, чтобы соединить любовь к эстетике и жажду знаний. Для тех, кто ценит наследие и хочет учиться красиво.»</p><div className="signature">Анна Романова</div><Link className="text-link" to="/eras">Исследовать эпохи <IconArrowRight size={16} /></Link></div>
      </section>
    </SiteLayout>
  );
}
