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
import { Delete } from "@mui/icons-material";

interface Props {
  album: Album;
}
const deleteAlbum = async (id: string): Promise<number> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/albums/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const AlbumItem = ({ album }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.stopPropagation();
    if (album._id) {
      deleteAlbum(String(album._id))
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

  return album ? (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        {" "}
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this album?"}
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
        className="flex sm:items-center p-2 gap-2 flex-col sm:flex-row grow"
        onClick={() => {
          router.push(`/albums/${album._id}`);
        }}
      >
        <div
          className="flex flex-col gap-2 bg-cover aspect-square grow rounded-md drop-shadow"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/${album.picture})`,
          }}
        >
          <div className="flex bg-white/50 flex-col items-start pd">
            <div className="line-clamp-3 font-semibold text-xl sm:line-clamp-1">
              {album.name}
            </div>
            <div className="line-clamp-3 sm:line-clamp-1">{album.artist}</div>
            <IconButton onClick={handleClickOpen}>
              <Delete />
            </IconButton>
          </div>
        </div>
      </div>
    </Fragment>
  ) : null;
};
