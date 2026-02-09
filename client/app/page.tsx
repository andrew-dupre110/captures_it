"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Album } from "@/types/album";
import { fetchHomeAlbumClient } from "@/services/home/home.services";

export default function Home() {
  const [homeAlbum, setHomeAlbum] = useState<Album | null>(null);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const isInitialLoading = homeAlbum === null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const data = await fetchHomeAlbumClient();
      if (cancelled) return;

      setHomeAlbum(data);

      if (data?.content) {
        setLoaded((prev) =>
          prev.length === data.content.length
            ? prev
            : new Array(data.content.length).fill(false),
        );
      } else {
        setLoaded([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-white mx-[2dvw]">
      <div className="mt-[5dvh]">
        <p className="text-primary-accent text-lg font-semibold uppercase">
          visual narratives
        </p>
        <p className="font-serif text-8xl font-light mt-4">
          Capturing the <br /> beauty of <br /> mundane
        </p>
        <p className="text-text-secondary text-wrap max-w-[35%] mt-4">
          A curated selection of works exploring light, texture, and silence
          across the globe. Based in London, working worldwide.
        </p>

        <div className="grid grid-cols-3 gap-[3%] mt-[5dvh]">
          {isInitialLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="overflow-hidden rounded-md"
                >
                  <div className="h-[500px] w-full animate-pulse bg-black/40" />
                </div>
              ))
            : (homeAlbum?.content ?? []).map((image, idx) => (
            <div key={image._id} className="min-h-[70%] overflow-hidden rounded-md ">
              <div className="relative h-full w-full">
                {/* Skeleton */}
                {!loaded[idx] && (
                  <div className="absolute inset-0 animate-pulse bg-black/40" />
                )}

                <Image
                  alt={`Image ${idx + 1}`}
                  src={image.url}
                  width={300}
                  height={300}
                  loading="lazy"
                  onLoadingComplete={() =>
                    setLoaded((prev) => {
                      if (idx >= prev.length) return prev;
                      const next = [...prev];
                      next[idx] = true;
                      return next;
                    })
                  }
                  className={`rounded-md grayscale h-[500px] w-full object-cover bg-black/40 transition-opacity duration-300 ${
                    loaded[idx] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 text-center">
          <a
            href="/work"
            className="border-1 border-primary-accent text-text-secondary py-2 px-10 rounded-sm"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
}
