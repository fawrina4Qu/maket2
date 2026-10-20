import { Outlet } from "react-router";
import { SiteLayout } from "@/components/site-layout";

export default function LecturesLayoutRoute() {
  return (
    <SiteLayout showHomeLink={false}>
      <Outlet />
    </SiteLayout>
  );
}
