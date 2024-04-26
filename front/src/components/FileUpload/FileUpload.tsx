import { ChangeEventHandler, useRef } from "react";

interface Props {
  label: string;
  setFile: (file: File) => void;
  accept: string;
}
export const FileUpload = ({ setFile, accept, label }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };
  return (
    <label
      className="bg-darkviolet/20 w-full h-full min-h-[10rem] border-2 border-dashed border-darkviolet rounded-md
      flex flex-col text-purpletext font-semibold items-center justify-center text-2xl"
      htmlFor="fileInput"
    >
      {label}
      <input
        id="fileInput"
        type="file"
        accept={accept}
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
    </label>
  );
};
