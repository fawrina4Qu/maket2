import { useSyncExternalStore } from "react";

const STORAGE_KEY = "favorite-lectures";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let favoriteTitles: string[] | null = null;
let panelOpen = false;

function readFavorites() {
  if (!favoriteTitles) {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      favoriteTitles = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      favoriteTitles = [];
    }
  }
  return favoriteTitles;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function toggleLectureFavorite(title: string) {
  const current = readFavorites();
  favoriteTitles = current.includes(title) ? current.filter((item) => item !== title) : [...current, title];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteTitles));
  emit();
}

export function useLectureFavorites() {
  return useSyncExternalStore(subscribe, readFavorites, () => EMPTY);
}

export function setFavoritesPanelOpen(open: boolean) {
  panelOpen = open;
  emit();
}

export function useFavoritesPanelOpen() {
  return useSyncExternalStore(subscribe, () => panelOpen, () => false);
}
