import { TrackHeader } from "@/components/TrackHeader";
import { TrackItem } from "@/components/TrackItem";
import { Track } from "@/types/track";

export const getTracks = async (): Promise<Track[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/`, {
    cache: "no-store",
  });
  return res.json();
};
export default async function Tracks() {
  const tracks = await getTracks();
  return (
    <div className="pd flex">
      <div className="pd grow backdrop-blur bg-white/50 flex flex-col gap-4 rounded-md">
        <TrackHeader
          title="Track list"
          button={{
            title: "Upload",
            link: "/tracks/create",
          }}
        />
        <div className="flex flex-col">
          {tracks.map((track) => (
            <TrackItem thisTrack={track} key={track._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
