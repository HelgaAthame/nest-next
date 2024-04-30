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
            tracks. <br />
            Developed by <strong>Olga Khmaruk</strong>.
          </h3>
          <h3>
            <strong>STACK</strong> 💎
            <br /> Next.js
            <br /> React
            <br /> Zustand
            <br /> Tailwind <br />
            Typescript <br />
            Nest.js
            <br /> Mongo db <br />
            Node js
          </h3>
        </div>
        <div className="flex pd flex-col sm:flex-row">
          <Button
            href="/albums"
            variant="contained"
            color="secondary"
            size="large"
          >
            Albums
          </Button>
          <Button
            href="/albums/create"
            variant="outlined"
            color="secondary"
            size="large"
          >
            New album
          </Button>
        </div>
      </div>
    </div>
  );
}
