import { fetchAllAlbumsWithContents } from "@/services/albums/albums.service";
import React from "react";
import Masonry from "@/components/Masonry";
import { AlbumContent } from "@/types/album";

const DisplayMasonry = ({ albumContent }: { albumContent: AlbumContent[] }) => {
  const content = albumContent.map((album) => ({
    id: album._id,
    img: album.url,
    url: album.url,
    height: album.metadata.dimensions.height / 7,
  }));

  return (
    <Masonry
      items={content}
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="top"
      scaleOnHover
      hoverScale={0.95}
      blurToFocus
      colorShiftOnHover={false}
    />
  );
};

const page = async () => {
  const albums = await fetchAllAlbumsWithContents();

  return (
    <div className="px-[10dvw]">
      {albums.map((album) => (
        <div key={album._id}>
          <div className="text-4xl">{album.title}</div>
          <div>{album.description}</div>
          <div className="mt-4">
            {albums.length > 0 && <DisplayMasonry albumContent={album.content} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
