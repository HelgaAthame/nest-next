import { useState } from "react";
import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";
import Image from "next/legacy/image";

interface Props {
  file: File;
}

export const PicturePreview = ({ file }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const base64String = arrayBufferToBase64(arrayBuffer);
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="relative w-full grow h-max rounded-md ">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="image"
          layout="fill"
          objectFit="contain"
          className="w-full rounded-md overflow-hidden"
        />
      )}
    </div>
  );
};
