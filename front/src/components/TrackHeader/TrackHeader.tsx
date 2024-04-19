"use client"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  button: {
    title: string;
    link: string;
  }
}
export const TrackHeader = ({title, button}: Props) => {
  const router = useRouter();
    return(<div className="w-full flex justify-between items-center">
        <h1>{title}</h1>
      <Button variant="contained" color="secondary"
      onClick={() => {
        router.push(button.link)
      }}
      >{button.title}</Button></div>)
}