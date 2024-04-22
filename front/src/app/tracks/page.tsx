import { TrackHeader } from "@/components/TrackHeader";
import { TrackItem } from "@/components/TrackItem";
import { Track } from "@/types/track";
import { Card, Grid, Divider } from "@mui/material";

export const getTracks = async (): Promise<Track[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/`);
  return res.json();
};
export default async function Tracks() {
  const tracks = await getTracks();
  return (
    <Grid container className="pd">
      <Card className="pd grow backdrop-blur bg-white/50 flex flex-col gap-4">
        <TrackHeader
          title="Track list"
          button={{
            title: "Upload",
            link: "/tracks/create",
          }}
        />
        <div className="flex flex-col">
          {tracks.map((track) => (
            <TrackItem track={track} key={track._id} />
          ))}
        </div>
      </Card>
    </Grid>
  );
}
