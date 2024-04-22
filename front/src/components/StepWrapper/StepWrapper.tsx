"use client";
import {
  Container,
  Stepper,
  Step,
  StepButton,
  Button,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import { FileUpload, PicturePreview } from "../FileUpload";
import { AudioPreview } from "../FileUpload/AudioPreview";

const steps = ["Info", "Cover", "Audio"];
export const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const next = () => {
    setActiveStep((prev) => prev + 1);
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  let StepContent = <Fragment></Fragment>;
  switch (activeStep) {
    case 0:
      StepContent = (
        <Fragment>
          <TextField label="Track Name" fullWidth={true} color="secondary" />
          <TextField label="Artist" fullWidth={true} color="secondary" />
          <TextField
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
    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-10 min-h-max grow">
      <Stepper activeStep={activeStep} color="secondary">
        {steps.map((step, index) => (
          <Step color="secondary" key={index} completed={activeStep > index}>
            <StepButton
              color="secondary"
              onClick={() => {
                setActiveStep(index);
              }}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {StepContent}
      <div className="flex w-full justify-between justify-self-end self-end">
        <Button
          variant="outlined"
          color="secondary"
          onClick={back}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={next}
          disabled={activeStep === 3}
        >
          Next
        </Button>
      </div>
    </div>
  );
};