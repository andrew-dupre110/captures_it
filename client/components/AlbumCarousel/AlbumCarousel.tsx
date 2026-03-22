"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Album } from "@/types/album";
import AlbumCard from "./AlbumCard";

interface AlbumCarouselProps {
  albums: Album[];
}

const AlbumCarousel = ({ albums }: AlbumCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex gap-4 h-full px-[4dvw] py-6">
        {albums.map((album, index) => (
          <div key={album._id} className="flex-none h-full">
            <AlbumCard album={album} isActive={index === selectedIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumCarousel;
