import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white mx-[2dvw]">
      <div className="mt-[5dvh]">
        <div className="flex mt-8 gap-10">
          <div>
            <p className="text-primary-accent text-lg font-semibold uppercase">
              Meet the artist
            </p>
            <p className="text-4xl font-bold mt-4">Emilie Isabelle</p>

            <div className="max-w-4xl text-text-secondary text-lg">
              Emilie Isabelle is a London-based photographer with a keen eye for
              capturing the poetry in everyday life. Specializing in natural
              light, texture, and intimate moments, her work invites viewers to
              explore the beauty within the ordinary. Emilie’s projects span
              continents, but her signature style remains deeply personal and
              quietly evocative.
            </div>
          </div>

          <div className="mr-30">
            <Image
              alt="owner-image"
              src="/images/owner.jpeg"
              height={400}
              width={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
