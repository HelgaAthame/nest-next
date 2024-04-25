"use client";
import { appStore } from "@/store/store";
import { Track } from "@/types/track";
import { Pause, PlayArrow, Photo, Delete } from "@mui/icons-material";
import { IconButton, Divider, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type MouseEventHandler, Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";

interface Props {
  thisTrack: Track;
  active?: boolean;
}
const deleteTrack = async (id: string): Promise<number> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  return res.json();
};

export const TrackItem = ({ thisTrack }: Props) => {
  const { active, setTrack, setActive, track } = appStore(
    (state: any) => state
  );
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const play: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.stopPropagation();
    setTrack(thisTrack);
    setActive(!active);
  };

  const deleteHandler: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    if (thisTrack._id) {
      deleteTrack(String(thisTrack._id))
        .then((res) => {
          revalidatePath("/tracks");
        })
        .catch((e) => {
          toast.error(e.message);
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  const handleClickOpen: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return thisTrack ? (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        {" "}
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this track?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            No
          </Button>
          <Button
            onClick={(e) => {
              deleteHandler(e);
              handleClose();
            }}
            autoFocus
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="flex sm:items-center p-2 gap-2 flex-col sm:flex-row"
        onClick={() => {
          router.push(`/tracks/${thisTrack._id}`);
        }}
      >
        <div className="flex gap-2 shrink-0">
          <IconButton onClick={play}>
            {active && track && thisTrack._id === track._id ? (
              <Pause />
            ) : (
              <PlayArrow />
            )}
          </IconButton>
          {thisTrack.picture ? (
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
