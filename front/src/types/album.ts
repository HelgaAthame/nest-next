import { Track } from "./track";

export interface Album {
  _id?: string;
  name: string;
  artist: string;
  picature: string;
  tracks: Track[];
}
