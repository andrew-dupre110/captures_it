import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="h-[10dvh] flex py-6 px-4 bg-background shadow-md items-center mb-4 justify-between">
      <div>
        <Image src={"/images/next.svg"} alt="logo" width={100} height={100} />
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
