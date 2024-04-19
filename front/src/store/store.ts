import { create } from "zustand";
import { Track } from "@/types/track";

export const appStore = create((set) => ({
    track: {
        _id: "66221a14b14631b447aa8b76",
        name: "Track10",
        artist: "Artist 1",
        text: "Картельные сговоры не допускают ситуации, при которой стремящиеся вытеснить традиционное производство, нанотехнологии будут разоблачены. Также как семантический разбор внешних противодействий напрямую зависит от поэтапного и последовательного развития общества. Не следует, однако, забывать, что существующая теория позволяет выполнить важные задания по разработке вывода текущих активов!",
        listens: 0,
        picture: "image/c90aa2da-d43f-48f0-95c5-52b365ea1187.jpg",
        audio: "audio/c9198594-5a4d-431f-ba36-b4e90dc7477d.mp3",
        comments: []
    },
    setTrack: (newTrack: Track) => set(((state:any) => ({track: {...state.track, ...newTrack}}))),
    active: true,
    setActive: (val: boolean) => set(((state:any) => ({active: val})))
}))