import { AlbumItem } from "../../components/AlbumItem";
import { TrackHeader } from "../../components/TrackHeader";
import { Album } from "../../types/album";

const getAlbums = async (): Promise<Album[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/albums`, {
    cache: "no-store",
  });
  return res.json();
};
export default async function Albums() {
  // @ts-ignore
  const albums = await getAlbums();
  return (
    <div className="pd flex">
      <div className="pd grow backdrop-blur bg-white/50 flex flex-col gap-4 rounded-md">
        <TrackHeader
          title="Albums"
          buttons={[
            {
              title: "New Album",
              link: "/albums/create",
            },
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid:cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {albums.map((album) => (
            <AlbumItem key={album._id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}
