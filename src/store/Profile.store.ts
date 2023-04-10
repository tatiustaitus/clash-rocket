import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ResponseType, fetch } from "@tauri-apps/api/http";
import { parseProfileYaml } from "../utils/Yaml.util";
import { ClashMetaProfile } from "../types/ClashMetaProfile.type";

type Profile = {
  domainName: string;
  url: string;
  yaml: string;
  data: ClashMetaProfile;
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
    persist(
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
        partialize: (state) => ({
          profiles: state.profiles,
          currentProfile: state.currentProfile,
        }),
      }
    )
  )
);

export const addNewProfile = async (url: string) => {
  const { setIsFetchingProfile, addProfile } = useProfileStore.getState();
  setIsFetchingProfile(true);
  try {
    const rawData = await fetch<string>(url, {
      method: "GET",
      responseType: ResponseType.Text,
    });
    const profileRawYaml = rawData.data;
    const profileData = parseProfileYaml(profileRawYaml);
    addProfile({
      domainName: new URL(url).hostname,
      url,
      yaml: profileRawYaml,
      data: profileData,
    });
  } catch (error) {
    // @todo: add a toast/notification feature
    console.warn("Failed to add profile", error);
  }
  setIsFetchingProfile(false);
};
