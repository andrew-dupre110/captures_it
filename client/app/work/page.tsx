import { fetchAllAlbumsWithContents } from "@/services/albums/albums.service";
import Image from "next/image";
import React from "react";

const page = async () => {
  const data = await fetchAllAlbumsWithContents();

  return (
    <div>
      {data.map((album) => (
        <div key={album._id}>
          <div>{album.title}</div>
          <div>{album.description}</div>
          {album.content.map((content) => (
            <div key={content._id}>
              <Image
                alt={"img"}
                src={content.url}
                height={content.metadata.dimensions.height}
                width={content.metadata.dimensions.width}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
