import { ChangeEventHandler, useRef } from "react";

interface Props {
    label: string;
    setFile: (file: File) => void;
    accept: string;
}
export const FileUpload = ({ setFile, accept, label}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
         if (e.target.files) setFile(e.target.files[0]);
    }
    return(
        <label className="w-full h-10 bg-red"
        htmlFor="fileInput">{label}
        <input 
        id="fileInput"
        type="file" 
        accept={accept} 
        className="hidden" 
        ref={inputRef}
        onChange={handleChange}
        /></label>
    )
}