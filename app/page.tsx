import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-[url('/images/test_images/landing.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-gradient-to-t from-black/60 from-50% to-white/20 w-screen h-screen absolute bottom-0 grid items-center justify-center">
        <div className="text-white flex  justify-between w-[65dvw] ">
          <div className="py-12">
            <h1 className="text-4xl">Hi, I am Emilie Isabelle</h1>
          </div>
          <div>
            <Image
              src={"/images/owner.jpeg"}
              alt="owner_picture"
              height={200}
              width={200}
              className="overflow-hidden rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
