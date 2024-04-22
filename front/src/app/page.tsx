import { Navbar } from "@/components/Navbar";
import { Button } from "@mui/material";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="max-w-full h-full lg:w-2/3 flex flex-col justify-center pd">
      <div className="flex flex-col justify-center pd backdrop-blur bg-white/50 rounded-md">
        <div className="flex flex-col pd">
          <h1>Music Library</h1>
          <h3>
            Music library for storing, changing, listening to your favorite
            tracks. Developed by Olga Khmaruk
          </h3>
        </div>
        <div className="flex pd">
          <Button
            href="/tracks"
            variant="contained"
            color="secondary"
            size="large"
          >
            Tracklist
          </Button>
          <Button
            href="/tracks/create"
            variant="outlined"
            color="secondary"
            size="large"
          >
            Create track
          </Button>
        </div>
      </div>
    </div>
  );
}
