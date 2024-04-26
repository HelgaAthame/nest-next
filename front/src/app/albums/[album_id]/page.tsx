import { Divider } from "@mui/material";
import { TrackHeader } from "@/components/TrackHeader";
import { Album } from "@/types/album";
import { TrackItem } from "@/components/TrackItem";

const getAlbumById = async (id: string): Promise<Album> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/albums/${id}`);
  return res.json();
};

export default async function AlbumPage({
  params,
}: {
  params: { album_id: string };
}) {
  const album: Album = await getAlbumById(params.album_id);
  return (
    <div
      className="pd bg-cover flex w-full min-h-full"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/${album.picture})`,
      }}
    >
      <div className="pd grow backdrop-blur bg-white/70 flex flex-col gap-4 rounded-md">
        <div className="flex flex-col gap-4 max-w-full">
          <TrackHeader
            title={album.name}
            buttons={[
              {
                title: "Back to albumlist",
                link: "/albums",
              },
              {
                title: "Upload a track",
                link: `/albums/${params.album_id}/add-track`,
              },
            ]}
          />
          <div>{album.artist}</div>
          <Divider />
          <h2>Tracks</h2>

          {album.tracks.map((track) => (
            <TrackItem key={track._id} thisTrack={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
