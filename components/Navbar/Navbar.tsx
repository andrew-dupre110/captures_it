import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-h-[10dvh] w-[100%]  absolute z-50">
      <div className="flex py-4 px-6 items-center mb-4 justify-between text-white">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/images/logo.jpg"} alt="logo" width={50} height={50} />
          <h2 className="text-2xl font-bold font-[montserrat]">Captures_it</h2>
        </Link>

        <div className="flex gap-4 font-[montserrat]">
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
