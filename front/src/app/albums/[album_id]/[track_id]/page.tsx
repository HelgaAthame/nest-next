import Divider from "@mui/material/Divider";
import { Track } from "../../../../types/track";
import { TrackHeader } from "../../../../components/TrackHeader";
import { Comments } from "../../../../components/Comments";

const getTrackById = async (id: string): Promise<Track> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/${id}`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function TrackPage({
  params,
}: {
  params: { album_id: string; track_id: string };
}) {
  const track = await getTrackById(params.track_id);
  return (
    <div
      className="pd bg-cover flex w-full min-h-full bg-center"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/${track.picture})`,
      }}
    >
      <div className="pd grow backdrop-blur bg-white/70 flex flex-col gap-4 rounded-md">
        <div className="flex flex-col gap-4 max-w-full">
          <TrackHeader
            title={track.name}
            buttons={[
              {
                title: "Back to album",
                link: `/albums/${params.album_id}`,
              },
            ]}
          />
          <Divider />
          <div>{track.artist}</div>
          <div>Listens: {track.listens}</div>
          <div>{track.text}</div>
          <Divider />
          <Comments comments={track.comments} trackId={track._id} />
        </div>
      </div>
    </div>
  );
}
