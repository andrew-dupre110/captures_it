import { graphqlClient } from "@/lib/sanity/client";
import { GET_HOME_ALBUM } from "@/queries/album";
import type { Album } from "@/types/album";

// SERVER-SIDE: fetch Home album from Sanity via GraphQL
export async function fetchHomeAlbum(): Promise<Album | null> {
  const data = await graphqlClient.request(GET_HOME_ALBUM);

  const albums: Album[] = data.allAlbum.map((album: any) => ({
    _id: album._id,
    title: album.title,
    description: album.description,
    content: data.allAlbumContent
      .filter((ac: any) => ac.album?._id === album._id)
      .flatMap(
        (ac: any) =>
          ac.content?.map((img: any) => ({
            _id: img.asset._id,
            url: img.asset.url,
            metadata: img.asset.metadata,
          })) ?? [],
      ),
  }));

  return albums[0] ?? null;
}

// CLIENT-SIDE: fetch Home album from our API
export async function fetchHomeAlbumClient(): Promise<Album | null> {
  try {
    const res = await fetch("/api/home-album", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch home album");
      return null;
    }
    const data: Album | null = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching home album", error);
    return null;
  }
}
