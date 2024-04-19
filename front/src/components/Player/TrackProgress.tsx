import { ChangeEvent } from "react";

interface Props {
    left: number;
    right: number;
    onChange: (e: ChangeEvent) => void
}
export const TrackProgress = ({left, right, onChange}: Props) => {
    return (
        <div className="w-full flex gap-3">
<input type="range" className="grow"
min={0}
max={right}
value={left}
onChange={onChange}/>
<div>{left} / {right}</div>
        </div>
    )
}