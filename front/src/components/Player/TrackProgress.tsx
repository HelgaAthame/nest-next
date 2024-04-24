import { intervalToDuration } from "date-fns";
import { ChangeEvent } from "react";

interface Props {
  left: number;
  right: number;
  onChange: (e: ChangeEvent) => void;
  time?: boolean;
}
export const TrackProgress = ({
  left,
  right,
  onChange,
  time = false,
}: Props) => {
  const lct = intervalToDuration({ start: 0, end: left * 1000 });
  const rct = intervalToDuration({ start: 0, end: right * 1000 });

  return (
    <div
      className={`${
        time ? "grow" : "w-full sm:min-w-40"
      } flex gap-3 sm:flex-nowrap shrink-0`}
    >
      <input
        type="range"
        className="grow w-full"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />

      <div className="flex flex-nowrap whitespace-nowrap shrink-0">
        {time
          ? `${(lct.minutes ?? "00").toString().padStart(2, "0")}:${(
              lct.seconds ?? "00"
            )
              .toString()
              .padStart(2, "0")}`
          : left}{" "}
        /{" "}
        {time
          ? `${(rct.minutes ?? "00").toString().padStart(2, "0")}:${(
              rct.seconds ?? "00"
            )
              .toString()
              .padStart(2, "0")}`
          : right}
      </div>
    </div>
  );
};
