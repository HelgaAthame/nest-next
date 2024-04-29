export interface Track {
  _id?: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: Comment[];
}

export interface Comment {
  id?: number;
  username: string;
  text: string;
}
