"use client";
import { TextField } from "@mui/material";
import { Fragment, useState } from "react";
import { FileUpload, PicturePreview } from "../FileUpload";
import { useInput } from "@/hooks/useInput";
import { useParams, useRouter } from "next/navigation";
import { Album } from "@/types/album";
import { StepWrapper } from "./StepWrapper";

const createAlbum = async (payload: FormData): Promise<Album> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/albums`, {
    method: "POST",
    body: payload,
  });
  return res.json();
};

const steps = ["Info", "Cover"];
export const CreateAlbumSteps = () => {
  const router = useRouter();
  const albumName = useInput("");
  const albumArtist = useInput("");

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);

  const createAlbumHahdler = () => {
    const formData = new FormData();
    formData.append("name", albumName.value);
    formData.append("artist", albumArtist.value);
    formData.append("picture", picture as Blob);
    createAlbum(formData).then((res) => {
      router.push(`/albums/${res._id}`);
    });
  };

  let StepContent = <Fragment></Fragment>;
  switch (activeStep) {
    case 0:
      StepContent = (
        <Fragment>
          <TextField
            {...albumName}
            label="Album Name"
            fullWidth={true}
            color="secondary"
          />
          <TextField
            label="Artist"
            fullWidth={true}
            color="secondary"
            {...albumArtist}
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
  }

  return (
    <StepWrapper
      finishHandler={createAlbumHahdler}
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
