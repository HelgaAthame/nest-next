"use client"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation";

export const TrackHeader = () => {
  const router = useRouter();
    return(<div className="w-full flex justify-between items-center">
        <h1>Track list</h1>
      <Button variant="contained" color="secondary"
      onClick={() => {
        router.push("/tracks/create")
      }}
      >Upload</Button></div>)
}