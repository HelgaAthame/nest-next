"use client";
import {appStore} from "@/store/store";
import {Track} from "@/types/track";
import {Pause, PlayArrow, Photo, Delete} from "@mui/icons-material";
import {IconButton, Divider} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {type MouseEventHandler, Fragment} from "react";

interface Props {
  thisTrack: Track;
  active?: boolean;
}
export const TrackItem = ({thisTrack}: Props) => {
  const {active, setTrack, setActive, track} = appStore((state: any) => state);
  const router = useRouter();

  const play: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.stopPropagation();
    setTrack(thisTrack);
    setActive(!active);
  };

  return thisTrack ? (
    <Fragment>
      <div
        className="flex items-center p-2 gap-2"
        onClick={() => {
          router.push(`/tracks/${thisTrack._id}`);
        }}
      >
        <IconButton onClick={play}>
          {active && track && thisTrack._id === track._id ? (
            <Pause />
          ) : (
            <PlayArrow />
          )}
        </IconButton>
        {thisTrack.picture ? (
          <div className="w-10 h-10 rounded relative shrink-0 overflow-clip">
            <Image
              alt={thisTrack.name}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${thisTrack.picture}`}
              objectFit="cover"
              layout="fill"
            />
          </div>
        ) : (
          <Photo />
        )}
        <div className="grow flex flex-col">
          <div>{thisTrack.name}</div>
          <div>{thisTrack.artist}</div>
        </div>
        <IconButton onClick={(e) => e.stopPropagation()}>
          <Delete />
        </IconButton>
      </div>
      <Divider className="last:hidden" />
    </Fragment>
  ) : null;
};
