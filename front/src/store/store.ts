import { create } from "zustand";
import { Track } from "@/types/track";

interface State {
  track: null | Track;
  setTrack: (newTrack: Track) => void;
  active: boolean;
  setActive: (val: boolean) => void;
}

export const appStore = create<State>((set) => ({
  track: null,
  setTrack: (newTrack: Track) =>
    set((state: any) => ({ track: { ...state.track, ...newTrack } })),
  active: false,
  setActive: (val: boolean) => set((state: any) => ({ active: val })),
}));
