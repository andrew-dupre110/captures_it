import { fetchAllAlbumsWithContents } from "@/services/albums/albums.service";
import React from "react";
import Masonry from "@/components/Masonry";
import { AlbumContent } from "@/types/album";

const page = async () => {
  const albums = await fetchAllAlbumsWithContents();

  return (
    <div className="px-[10dvw]">
      {albums.map((album) => (
        <div key={album._id}>
          <div className="text-4xl">{album.title}</div>
          <div>{album.description}</div>
          <div className="mt-4">
            {/** 
             * NOTE: Use swiper js for slider 
             * Inspiration : https://www.youtube.com/watch?v=DiMj7tRUIBE&list=PLes5YJFlROjF1Lf2RZykNeD-q6KuUYXmn
            */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
