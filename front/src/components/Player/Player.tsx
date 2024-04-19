"use client"
import { Pause, Photo, PlayArrow, VolumeUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image"
import { TrackProgress } from "./TrackProgress";
import { appStore } from "@/store/store"
import { useEffect, MouseEventHandler, useState, ChangeEventHandler, ChangeEvent } from "react";

let audio: HTMLAudioElement;
export const Player = () => {
    const {track, active, setTrack, setActive} = appStore((state: any) => state);
    const [volume, setVolume] = useState<number>(50);

    const changeVolume = (e:ChangeEvent<Element>) => {
        const target = e.target as HTMLInputElement;
        const val = target.value;
        if (val) setVolume(Number(val));
    }

    const play:  MouseEventHandler<HTMLButtonElement> | undefined= (e) => {
        e.stopPropagation();
        setActive(!active);
        if (active) {
          audio.play();
        } else {
audio.pause();
        }
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
            audio.src=`${process.env.NEXT_PUBLIC_BASE_URL}/${track.audio}`;
            audio.volume = volume/100;
        }
    },[])

    useEffect(() => {
        audio.volume = volume/100;
    },[volume])

    return (
        <div className="h-12 w-full bottom flex items-center p-2 gap-2 bg/white-50">
            <IconButton onClick={play}>
        {active
          ?<PlayArrow/>
          :<Pause/>
        }
        </IconButton>
        {track.picture 
      ? <div 
      className="w-10 h-10 rounded relative shrink-0 overflow-clip"><Image alt={track.name} src={
        `${process.env.NEXT_PUBLIC_BASE_URL}/${track.picture}`}
        objectFit="cover"
        layout="fill"
        /></div>
        : <Photo/>}
        <div className="grow flex flex-col">
            <div>{track.name}</div>
            <div>{track.artist}</div>
        </div>
        
        <TrackProgress left={10} right={20} onChange={() => {}}/>
        <VolumeUp />
        <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}