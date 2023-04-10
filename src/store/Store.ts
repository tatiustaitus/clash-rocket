import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Child } from "@tauri-apps/api/shell";

type ServerType = "private" | "community";

type Server = {
  address: string;
  type: ServerType;
  ping?: number;
};

type State = {
  servers: Server[];
  socks: number;
  currentServer: Server | null;
  clashMetaCoreInstance: Child | null;
  addServer: (server: Server) => void;
  removeServer: (server: Server) => void;
  setSocks: (value: number) => void;
  setCurrentServer: (server: Server | null) => void;
  setClashMetaCoreInstance: (instance: Child | null) => void;
};

const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        servers: [],
        socks: 1080,
        currentServer: null,
        clashMetaCoreInstance: null,
        addServer: (server: Server) =>
          set((state) => ({
            ...state,
            servers: [...state.servers, server],
          })),
        removeServer: (server: Server) =>
          set((state) => ({
            ...state,
            servers: state.servers.filter((s) => s.address !== server.address),
          })),
        setSocks: (value: number) =>
          set((state) => ({
            ...state,
            socks: value,
          })),
        setCurrentServer: (server: Server | null) =>
          set((state) => ({
            ...state,
            currentServer: server,
          })),
        setClashMetaCoreInstance: (instance: Child | null) =>
          set((state) => ({
            ...state,
            clashMetaCoreInstance: instance,
          })),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);

export default useStore;
