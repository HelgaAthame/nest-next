import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { ReactNode } from "react";

interface Props {
  steps: string[];
  activeStep: number;
  children: ReactNode;
  setActiveStep: (val: number) => void;
  finishHandler: () => void;
}

export const StepWrapper = ({
  steps,
  activeStep,
  children,
  setActiveStep,
  finishHandler,
}: Props) => {
  const next = () => {
    setActiveStep(activeStep + 1);
  };
  const back = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-10 grow">
      <Stepper
        activeStep={activeStep}
        color="secondary"
        className="overflow-hidden"
      >
        {steps.map((step, index) => (
          <Step color="secondary" key={index} completed={activeStep > index}>
            <div className="h-20 flex items-center">
              <StepButton
                color="secondary"
                onClick={() => {
                  setActiveStep(index);
                }}
                className="py-0 h-16"
              >
                {step}
              </StepButton>
            </div>
          </Step>
        ))}
      </Stepper>

      {children}
      <div className="flex w-full justify-between justify-self-end self-end h-12">
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
          onClick={activeStep === steps.length - 1 ? finishHandler : next}
          disabled={activeStep > steps.length - 1}
        >
          {activeStep === steps.length - 1 ? "Create" : "Next"}
        </Button>
      </div>
    </div>
  );
};
