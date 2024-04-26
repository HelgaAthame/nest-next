import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";
import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface Props {
  file: File;
}

let audio: HTMLAudioElement;
export const AudioPreview = ({ file }: Props) => {
  //const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [play, setPlay] = useState<boolean>(false);

  const playStop = useCallback(() => {
    setPlay(play ? false : true);
    if (audio) {
      if (play) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [play, audio]);

  useEffect(() => {
    if (file) {
      audio = new Audio();
      audio.src = URL.createObjectURL(file);
    }
  }, []);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <IconButton
        onClick={playStop}
        className="w-20 h-20 bg-darkmagenta hover:bg-darkmagenta/80"
      >
        {play ? <Pause fill="white" /> : <PlayArrow />}
      </IconButton>
    </div>
  );
};
