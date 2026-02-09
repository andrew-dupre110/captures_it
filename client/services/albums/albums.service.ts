import { graphqlClient } from "@/lib/sanity/client";
import { GET_ALBUMS_QUERY } from "@/queries/album";
import { Album } from "@/types/album";

export async function fetchAllAlbumsWithContents(): Promise<Album[]> {
  const data = await graphqlClient.request(GET_ALBUMS_QUERY)

  const res = data.allAlbum.map((album:any) => ({
    _id: album._id,
    title: album.title,
    description: album.description,
    content: data.allAlbumContent
      .filter((ac: any) => ac.album?._id === album._id)
      .flatMap((ac:any) => ac.content?.map((img:any) => ({
        _id: img.asset._id,
        url: img.asset.url,
        metadata: img.asset.metadata
      })) || [])
  }))

  return res;
}