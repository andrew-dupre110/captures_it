import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="min-h-[8dvh] max-h-[8dvh] w-[100%] bg-black text-white">
      <div className="flex py-4 px-6 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/images/logo.jpg"} alt="logo" width={50} height={50}  className="rounded-full"/>
          <h2 className="text-2xl font-bold font-serif">Captures_it</h2>
        </Link>

        <div className="flex gap-4 font-sans font-semibold">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
