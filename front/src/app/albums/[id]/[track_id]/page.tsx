import { Card, Grid, Divider, TextField, Button } from "@mui/material";
import { Track } from "@/types/track";
import { TrackHeader } from "@/components/TrackHeader";
import { CommentItem } from "@/components/CommentItem";
import { appStore } from "@/store/store";

export const getTrackById = async (id: string): Promise<Track> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/${id}`);
  return res.json();
};

export default async function TrackPage({
  params,
}: {
  params: { id: string };
}) {
  const track = await getTrackById(params.id);
  return (
    <div
      className="pd bg-cover flex w-full min-h-full"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/${track.picture})`,
      }}
    >
      <div className="pd grow backdrop-blur bg-white/70 flex flex-col gap-4 rounded-md">
        <div className="flex flex-col gap-4 max-w-full">
          <TrackHeader
            title={track.name}
            button={{
              title: "Back to tracklist",
              link: "/tracks",
            }}
          />
          <Divider />
          <div>{track.artist}</div>
          <div>Listens: {track.listens}</div>
          <div>{track.text}</div>
          <Divider />
          <h2>Comments</h2>
          <TextField label="Username" fullWidth={true} color="secondary" />
          <TextField
            label="Comment"
            fullWidth={true}
            multiline
            maxRows={4}
            color="secondary"
          />
          <Button>Comment</Button>
          {track.comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
