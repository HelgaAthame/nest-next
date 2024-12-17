"use client";
import { TextField } from "@mui/material";
import { Fragment, useState } from "react";
import { FileUpload, PicturePreview } from "../FileUpload";
import { AudioPreview } from "../FileUpload/AudioPreview";
import { Track } from "@/types/track";
import { useInput } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { appStore } from "@/store/store";
import { StepWrapper } from "./StepWrapper";
import { toast } from "react-toastify";

const createTrack = async (payload: FormData): Promise<Track> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/albums/add-track`, {
    method: "POST",
    body: payload,
  });
  return res.json();
};

const steps = ["Info", "Cover", "Audio"];

interface Props {
  albumId: string;
}
export const CreateTrackSteps = ({ albumId }: Props) => {
  const router = useRouter();
  const { setTrack } = appStore((state: any) => state);
  const trackName = useInput("");
  const trackArtist = useInput("");
  const lyrics = useInput("");
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const createTrackHahdler = () => {
    const formData = new FormData();
    formData.append("name", trackName.value);
    formData.append("artist", trackArtist.value);
    formData.append("text", lyrics.value);
    formData.append("picture", picture as Blob);
    formData.append("audio", audio as Blob);
    formData.append("albumid", albumId);
    createTrack(formData)
      .then((res) => {
        if ("_id" in res && albumId) {
          setTrack(res);
          router.push(`/albums/${albumId}/${res._id}`);
        } else {
          toast.error("Track was not created");
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  let StepContent = <Fragment></Fragment>;
  switch (activeStep) {
    case 0:
      StepContent = (
        <Fragment>
          <TextField
            {...trackName}
            label="Track Name"
            fullWidth={true}
            color="secondary"
          />
          <TextField
            label="Artist"
            fullWidth={true}
            color="secondary"
            {...trackArtist}
          />
          <TextField
            {...lyrics}
            label="Lyrics"
            fullWidth={true}
            multiline
            maxRows={5}
            color="secondary"
          />
        </Fragment>
      );
      break;
    case 1:
      StepContent = picture ? (
        <PicturePreview file={picture} />
      ) : (
        <FileUpload
          setFile={(file) => {
            setPicture(file);
          }}
          accept={"image/*"}
          label="Upload picture"
        />
      );
      break;
    case 2:
      StepContent = audio ? (
        <AudioPreview file={audio} />
      ) : (
        <FileUpload
          setFile={(file) => {
            setAudio(file);
          }}
          accept={"audio/*"}
          label="Upload audio"
        />
      );
      break;
  }

  return (
    <StepWrapper
      finishHandler={createTrackHahdler}
      setActiveStep={(val) => {
        setActiveStep(val);
      }}
      activeStep={activeStep}
      steps={steps}
    >
      {StepContent}
    </StepWrapper>
  );
};
