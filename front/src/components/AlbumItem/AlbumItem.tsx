"use client";
import { appStore } from "@/store/store";
import { IconButton, Divider, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type MouseEventHandler, Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";
import { Album } from "@/types/album";

interface Props {
  album: Album
}

export const TrackItem = ({ album }: Props) => {
  const router = useRouter();  

  return album ? (
    <Fragment>     
      <div
        className="flex sm:items-center p-2 gap-2 flex-col sm:flex-row"
        onClick={() => {
          router.push(`/albums/${album._id}`);
        }}
      >
        <div className="flex gap-2 shrink-0">
          {album.picture ? (
            <div className="w-10 h-10 rounded relative shrink-0 overflow-clip">
              <Image
                alt={thisTrack.name}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${thisTrack.picture}`}
                objectFit="cover"
                layout="fill"
              />
            </div>
          ) : (
            <Photo />
          )}
        </div>

        <div className="grow flex flex-col">
          <div className="line-clamp-3 font-semibold text-xl sm:line-clamp-1">
            {thisTrack.name}
          </div>
          <div className="line-clamp-3 sm:line-clamp-1">{thisTrack.artist}</div>
        </div>
        <div className="shrink-0">
          <IconButton onClick={handleClickOpen}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <Divider className="last:hidden" />
    </Fragment>
  ) : null;
};
