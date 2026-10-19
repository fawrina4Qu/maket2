import { Outlet } from "react-router";
import { HomeLink } from "@/components/home-link";
import { SiteLayout } from "@/components/site-layout";

export default function LecturesLayoutRoute() {
  return (
    <SiteLayout>
      <HomeLink />
      <Outlet />
    </SiteLayout>
  );
}
