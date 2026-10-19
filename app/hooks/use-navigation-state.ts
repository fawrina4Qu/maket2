import { appBasePath, appPath } from "@agent-native/core/client/api-path";
import { useAgentRouteState } from "@agent-native/core/client/navigation";

import { TAB_ID } from "@/lib/tab-id";

export interface NavigationState {
  view: string;
  path?: string;
}

export function useNavigationState() {
  useAgentRouteState<NavigationState>({
    browserTabId: TAB_ID,
    requestSource: TAB_ID,
    getNavigationState: ({ pathname }) => ({
      view: viewForPath(pathname),
      path: appPath(pathname),
    }),
    getCommandPath: (command) =>
      routerPath(command.path || pathForView(command.view)),
  });
}

function viewForPath(pathname: string): string {
  if (pathname.startsWith("/lectures/")) return "lecture-section";
  switch (pathname) {
    case "/new": return "new-arrivals";
    case "/favorites": return "favorite-courses";
    case "/lectures": return "lectures";
    case "/eras": return "eras";
    case "/about": return "about";
    case "/map": return "interactive-map";
    default: return "home";
  }
}

function pathForView(view?: string): string {
  switch (view) {
    case "new-arrivals": return "/new";
    case "favorite-courses": return "/favorites";
    case "lectures":
    case "lecture-section": return "/lectures";
    case "eras": return "/eras";
    case "about": return "/about";
    case "interactive-map": return "/map";
    case "home":
    default: return "/";
  }
}

function routerPath(path: string): string {
  const basePath = appBasePath();
  if (!basePath) return path;
  if (path === basePath) return "/";
  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length) || "/";
  }
  return path;
}
