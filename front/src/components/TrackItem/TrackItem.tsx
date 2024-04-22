"use client";
import { appStore } from "@/store/store";
import {Track} from "@/types/track";
import {Pause, PlayArrow, Photo, Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { MouseEventHandler } from "react";

interface Props {
  track: Track;
  active?: boolean;
}
export const TrackItem = ({track}: Props) => {
  const { active, setTrack, setActive } = appStore(
    (state: any) => state
  );
  const router = useRouter();

  const play: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.stopPropagation();
    setTrack(track);
    setActive(!active);
  };
  return (
    <div
      className="odd:backdrop-saturate-50 flex items-center p-2 gap-2"
      onClick={() => {
        router.push(`/tracks/${track._id}`);
      }}
    >
      <IconButton onClick={play}>
        {active ? <PlayArrow /> : <Pause />}
      </IconButton>
      {track.picture ? (
        <div className="w-10 h-10 rounded relative shrink-0 overflow-clip">
          <Image
            alt={track.name}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${track.picture}`}
            objectFit="cover"
            layout="fill"
          />
        </div>
      ) : (
        <Photo />
      )}
      <div className="grow flex flex-col">
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </div>
      <IconButton onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </div>
  );
};
