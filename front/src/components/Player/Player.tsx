"use client";
import { Pause, Photo, PlayArrow, VolumeUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { TrackProgress } from "./TrackProgress";
import { appStore } from "@/store/store";
import { useEffect, MouseEventHandler, useState, ChangeEvent } from "react";

let audio: HTMLAudioElement;
export const Player = () => {
  const { track, active, setActive } = appStore((state: any) => state);
  const [volume, setVolume] = useState<number>(50);
  const [curTime, setCurTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const changeVolume = (e: ChangeEvent<Element>) => {
    const target = e.target as HTMLInputElement;
    const val = target.value;
    if (val) {
      setVolume(Number(val));
      audio.volume = Number(val) / 100;
    }
  };

  const changeCurrentTime = (e: ChangeEvent<Element>) => {
    const target = e.target as HTMLInputElement;
    const val = target.value;
    if (val) {
      setCurTime(Number(val));
      audio.currentTime = Number(val);
    }
  };

  const play: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.stopPropagation();
    setActive(!active);
  };

  useEffect(() => {
    audio = new Audio();
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    audio.ontimeupdate = () => {
      setCurTime(audio.currentTime);
    };
  }, []);

  useEffect(() => {
    if (track && audio) {
      audio.src = `${process.env.NEXT_PUBLIC_BASE_URL}/${track.audio}`;
      audio.volume = volume / 100;
    }
  }, [track, audio]);

  useEffect(() => {
    if (audio) {
      if (active) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [active]);

  return track ? (
    <div className="min-h-12 w-full bottom bg-white/50 backdrop-blur ">
      <div className="w-full flex sm:items-center p-2 gap-2 flex-col sm:flex-row sm:flex-nowrap">
        <div className="flex gap-2 grow">
          <div className="shrink-0">
            <IconButton onClick={play}>
              {active ? <Pause /> : <PlayArrow />}
            </IconButton>
          </div>
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
          <div className="flex flex-col grow">
            <div className="truncate font-semibold text-xl ">{track.name}</div>
            <div className="truncate">{track.artist}</div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <VolumeUp color="disabled" />
          <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
      </div>
      <TrackProgress
        left={curTime}
        right={duration}
        onChange={changeCurrentTime}
        time
      />
    </div>
  ) : null;
};
