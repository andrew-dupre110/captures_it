import SplitText from "@/components/SplitText";

export default function Home() {
  return (
    <div className="bg-black min-h-[calc(100dvh-16dvh)]">
      <div className="font-sans mx-[4dvw] h-[80dvh] grid items-center">
        <div className="text-white">
          <SplitText
            text="Hi. I'm Emilie isabelle"
            className="text-5xl uppercase font-bold"
            splitType="words"
          />
          <SplitText
            text="Captured a simple expression, a simple smile, or even a moment taken
                  in complete discretion, and subsequently have a beautiful result. I
                  base myself mainly on the naturalness of the photo. We will say that
                  it is my trademark. But above all, kept the details forgotten nowadays"
            className="text-lg max-w-[60dvw] font-semibold"
            splitType="lines"
            textAlign="start"
          />
        </div>
      </div>
    </div>
  );
}
