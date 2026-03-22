import { fetchAllAlbumsWithContents } from "@/services/albums/albums.service";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedContent from "@/components/AnimatedContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const albums = await fetchAllAlbumsWithContents();
  const album = albums.find((a) => a._id === id);

  if (!album) notFound();

  return (
    <div className="bg-black text-white min-h-full font-sans">
      <div className="mx-[4dvw] py-16">
        <AnimatedContent distance={20} duration={0.6}>
          <Link
            href="/work"
            className="text-primary-accent text-xs uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            ← Work
          </Link>

          <h1 className="text-5xl uppercase font-bold mt-6">{album.title}</h1>
          <div className="w-8 h-px bg-primary-accent mt-4 mb-6" />

          {album.description && (
            <p className="text-lg font-semibold text-white/70 max-w-2xl mb-12">
              {album.description}
            </p>
          )}
        </AnimatedContent>

        <AnimatedContent distance={50} duration={1} delay={0.2}>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {album.content.map((image) => (
              <div key={image._id} className="mb-3 break-inside-avoid relative overflow-hidden rounded-lg">
                <ImageWithSkeleton
                  src={image.url}
                  alt={album.title}
                  width={image.metadata.dimensions.width}
                  height={image.metadata.dimensions.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default page;
