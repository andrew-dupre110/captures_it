import { fetchAllAlbumsWithContents } from "@/services/albums/albums.service";
import AlbumCarousel from "@/components/AlbumCarousel/AlbumCarousel";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";

const page = async () => {
  const albums = await fetchAllAlbumsWithContents();

  return (
    <div className="container bg-black overflow-clip">
      <div className="font-sans h-[84dvh] text-white flex flex-col">
        <AnimatedContent
          distance={30}
          duration={0.8}
          delay={0}
          className="mx-[4dvw] pt-8 pb-4"
        >
          <p className="text-primary-accent text-xs uppercase tracking-[0.3em] mb-4">
            Portfolio
          </p>
          <SplitText
            text="Work"
            className="text-5xl uppercase font-bold"
            splitType="words"
            duration={2}
            tag="h1"
            textAlign="start"
          />
          <div className="w-8 h-px bg-primary-accent mt-4" />
        </AnimatedContent>

        <AnimatedContent
          distance={40}
          duration={1}
          delay={0.3}
          className="flex-1 min-h-0"
        >
          <AlbumCarousel albums={albums} />
        </AnimatedContent>
      </div>
    </div>
  );
};

export default page;
