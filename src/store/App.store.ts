import { create } from "zustand";
import type { Child } from "@tauri-apps/api/shell";

type AppStore = {
  socks: number;
  clashMetaCoreInstance: Child | null;
  setSocks: (value: number) => void;
  setClashMetaCoreInstance: (instance: Child | null) => void;
};

const useAppStore = create<AppStore>((set) => ({
  socks: 1080,
  clashMetaCoreInstance: null,
  setSocks: (value: number) =>
    set((state) => ({
      ...state,
      socks: value,
    })),
  setClashMetaCoreInstance: (instance: Child | null) =>
    set((state) => ({
      ...state,
      clashMetaCoreInstance: instance,
    })),
}));

export { useAppStore };
