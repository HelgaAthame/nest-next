"use client"
import { Pause, Photo, PlayArrow, VolumeUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image"
import { TrackProgress } from "./TrackProgress";

export const Player = () => {
    const track = {
        "_id": "66221a14b14631b447aa8b76",
        "name": "Track10",
        "artist": "Artist 1",
        "text": "Картельные сговоры не допускают ситуации, при которой стремящиеся вытеснить традиционное производство, нанотехнологии будут разоблачены. Также как семантический разбор внешних противодействий напрямую зависит от поэтапного и последовательного развития общества. Не следует, однако, забывать, что существующая теория позволяет выполнить важные задания по разработке вывода текущих активов!",
        "listens": 0,
        "picture": "image/c90aa2da-d43f-48f0-95c5-52b365ea1187.jpg",
        "audio": "audio/c9198594-5a4d-431f-ba36-b4e90dc7477d.mp3",
        "comments": [],
        "__v": 0
    };
    const active = false;
    return (
        <div className="h-12 w-full bottom flex items-center p-2 gap-2 bg/white-50">
            <IconButton onClick={e => e.stopPropagation()}>
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
        <TrackProgress left={10} right={20} onChange={() => {}}/>
        </div>
    )
}