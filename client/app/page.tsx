import Image from "next/image";

export default async function Home() {
  return (
    <div className="bg-white mx-[2dvw]">
      <div className="mt-[5dvh]">
        <p className="text-primary-accent text-lg font-semibold uppercase">
          visual narratives
        </p>
        <p className="font-serif text-8xl font-light mt-4">
          Capturing the <br></br> beauty of <br></br> mundane
        </p>
        <p className="text-text-secondary text-wrap max-w-[35%] mt-4">A curated selection of works exploring light, texture, and silence across the globe. Based in London, working worldwide.</p>

        <div className="grid grid-cols-3 gap-[3%] mt-[5dvh]">
          {Array.from({length:6}).map((img, idx) => (
            <div key={idx} className="min-h-[70%] overflow-hidden bg-red-400">
              <Image 
                alt={`Image ${idx + 1}`} 
                src="/images/test_images/landing.jpg" 
                width={500} 
                height={500}
                className="h-full w-full object-cover bg-red-400"
              />
            </div>
          ))}
        </div>

        <div className="my-8 text-center"><a href='/work' className="border-1 border-primary-accent text-text-secondary py-2 px-10 rounded-sm">View More</a></div>
      </div>
    </div>
  );
}
