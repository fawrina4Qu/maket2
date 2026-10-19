import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";

export function HomeLink() {
  return (
    <div className="section-wrap home-link-row">
      <Link className="lecture-back-link" to="/"><IconArrowLeft size={17} /> На главную</Link>
    </div>
  );
}
