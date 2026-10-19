import { IconArrowRight } from "@tabler/icons-react";
import { Outlet } from "react-router";
import { SiteLayout } from "@/components/site-layout";

export default function LecturesLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
