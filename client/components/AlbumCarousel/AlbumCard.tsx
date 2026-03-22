import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Link from "next/link";
import { Album } from "@/types/album";

interface AlbumCardProps {
  album: Album;
  isActive: boolean;
}

const AlbumCard = ({ album, isActive }: AlbumCardProps) => {
  const cover = album.content[0];

  return (
    <Link href={`/work/${album._id}`} className="block select-none h-full">
      <div
        className={`relative w-[200px] sm:w-[260px] h-full transition-transform duration-300 ease-out cursor-pointer overflow-hidden rounded-lg ${
          isActive ? "scale-100" : "scale-90"
        }`}
      >
        {cover ? (
          <ImageWithSkeleton
            src={cover.url}
            alt={album.title}
            fill
            sizes="(max-width: 640px) 200px, 260px"
            className="object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold">
            {album.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
