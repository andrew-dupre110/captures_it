import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-h-[10dvh] w-[100%]">
      <div className="flex py-4 px-6 items-center mb-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/images/logo.jpg"} alt="logo" width={50} height={50}  className="rounded-full"/>
          <h2 className="text-2xl font-bold font-serif">Captures_it</h2>
        </Link>

        <div className="flex gap-4 font-sans">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
