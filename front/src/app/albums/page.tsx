import { TrackHeader } from "@/components/TrackHeader";
import { Album } from "@/types/album";

export const getAlbums = async (): Promise<Album[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/`, {
    cache: "no-store",
  });
  return res.json();
};
export default async function Albums() {
  const albums = await getAlbums();
  return (
    <div className="pd flex">
      <div className="pd grow backdrop-blur bg-white/50 flex flex-col gap-4 rounded-md">
        <TrackHeader
          title="Albums"
          button={{
            title: "Upload",
            link: "/albums/create",
          }}
        />
        <div className="flex flex-col">
          {albums.map((album) => (
            <AlbumItem key={album._id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}
