"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  buttons: {
    title: string;
    link: string;
  }[];
}
export const TrackHeader = ({ title, buttons }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between sm:items-center flex-col sm:flex-row gap-2">
      <h1 className="grow font-semibold text-xl ">{title}</h1>
      {buttons.map((button, ind) => (
        <Button
          key={ind}
          variant="contained"
          color="secondary"
          onClick={() => {
            router.push(button.link);
          }}
          className="whitespace-nowrap min-w-max"
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};
