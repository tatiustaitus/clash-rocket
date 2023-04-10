import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ResponseType, fetch } from "@tauri-apps/api/http";

type Profile = {
  url: string;
  yaml: string | null;
  proxies: any[] | null;
};

type ProfileState = {
  isFetchingProfile: boolean;
  profiles: Profile[];
  currentProfile: Profile | null;
  addProfile: (profile: Profile) => void;
  removeProfile: (profile: Profile) => void;
  setCurrentProfile: (profile: Profile | null) => void;
  setIsFetchingProfile: (isFetchingProfile: boolean) => void;
};

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist<ProfileState>(
      (set) => ({
        profiles: [],
        currentProfile: null,
        isFetchingProfile: false,
        setIsFetchingProfile: (isFetchingProfile) =>
          set((state) => ({ ...state, isFetchingProfile })),
        addProfile: (profile: Profile) =>
          set((state) => ({
            ...state,
            profiles: [...state.profiles, profile],
          })),
        removeProfile: (profile: Profile) =>
          set((state) => ({
            ...state,
            profiles: state.profiles.filter((s) => s.url !== profile.url),
          })),
        setCurrentProfile: (profile: Profile | null) =>
          set((state) => ({
            ...state,
            currentProfile: profile,
          })),
      }),
      {
        name: "clash-rocket-storage",
      }
    )
  )
);

export const fetchProfile = async (url: string) => {
  const { setIsFetchingProfile } = useProfileStore.getState();
  setIsFetchingProfile(true);
  const rawData = await fetch(url, {
    method: "GET",
    responseType: ResponseType.Text,
  });
  setIsFetchingProfile(false);
  const data = rawData.data;
  console.info("data", data);
};
