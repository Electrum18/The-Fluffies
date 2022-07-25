import { useEffect } from "react";
import useSWR from "swr";
import shallow from "zustand/shallow";

import useParameters from "@/helpers/parameters";
import {
  getProfileStoredSelected,
  getProfileStoredSlot,
  validateSaves,
} from "@/libs/saves";

import { useSiteUrl } from "./urls";

const selector = (state) => [
  state.setProfileSaves,
  state.setIsProfile,
  state.setProfileSlot,
];

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((res) => res.text());

export function useUserSaves() {
  const loginUrl = useSiteUrl();

  const { data } = useSWR(loginUrl + "/user/saves", fetcher);

  try {
    return validateSaves(JSON.parse(data).saves);
  } catch {
    return [];
  }
}

export function useUserSavesSetter() {
  const [setProfileSaves, setIsProfile, setProfileSlot] = useParameters(
    selector,
    shallow
  );

  const userSaves = useUserSaves();

  useEffect(() => {
    setProfileSaves(userSaves);
    setIsProfile(getProfileStoredSelected());

    const slot = getProfileStoredSlot();

    setProfileSlot(userSaves[slot] ? slot : 0);
  }, [setIsProfile, setProfileSaves, setProfileSlot, userSaves]);
}

export function useValidSaveStore(saves, slot, profileSlot, profileSelected) {
  useEffect(() => {
    const timer = setTimeout(
      () => localStorage.setItem("avatars", JSON.stringify(saves)),
      1000
    );

    return () => clearTimeout(timer);
  }, [saves]);

  useEffect(() => {
    localStorage.setItem("slot", slot + "");
  }, [slot]);

  useEffect(() => {
    localStorage.setItem("profile_slot", profileSlot + "");
  }, [profileSlot]);

  useEffect(() => {
    localStorage.setItem("profile_selected", +!!profileSelected);
  }, [profileSelected]);
}
