import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";

export function HomeLink({ inline = false }: { inline?: boolean }) {
  return (
    <div className={inline ? "home-link-inline" : "section-wrap home-link-row"}>
      <Link className="lecture-back-link" to="/"><IconArrowLeft size={17} /> На главную</Link>
    </div>
  );
}
