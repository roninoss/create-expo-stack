import Image from "next/image";
import DoubleQuote from "./DoubleQuote";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const innerScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (innerScrollerRef.current && window.innerWidth >= 640) {
      const scrollerContent = Array.from(
        innerScrollerRef.current.children
      ) as HTMLElement[];
      scrollerContent.forEach((child) => {
        const duplicatedNode = child.cloneNode(true) as HTMLElement;
        duplicatedNode.setAttribute("aria-hidden", "true");
        innerScrollerRef.current!.appendChild(duplicatedNode);
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-16 pt-24 2xl:pt-0">
        What people are saying
      </h1>
      <div className="infinite-scroll-x-container mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={innerScrollerRef}
          className="infinite-scroll-x sm:w-max sm:pt-8 relative sm:flex flex-nowrap mx-auto grid max-w-2xl grid-cols-1 sm:mx-0 sm:max-w-none"
        >
          <div className="flex flex-col sm:-ml-[0.5px] border-white/20 pt-16 sm:border-l sm:pr-8 sm:pt-0 sm:pl-16">
            <figure className="flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-white relative">
                <DoubleQuote />
                <p className="max-w-[40ch]">
                  {
                    "Thanks for building create-expo-stack! It's helped our team to quickly spin up apps and test various modules prior to adding them to our production application."
                  }
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <Image
                  className="h-14 w-14 rounded-3xl bg-gray-50"
                  src="/yefim.jpeg"
                  alt="yefim"
                  width={56}
                  height={56}
                />
                <div className="text-base">
                  <div className="font-semibold text-white">
                    Yefim Vedernikoff
                  </div>
                  <div className="mt-1 text-gray-500">
                    Software Engineer at Partiful
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col sm:-ml-[0.5px] border-white/20 pt-16 sm:border-l sm:pr-8 sm:pt-0 sm:pl-16">
            <figure className="flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-white relative">
                <DoubleQuote />
                <p className="max-w-[40ch]">
                  {
                    "This is great! I've been using this for a ton of proof of concept applications. This serves my needs better than using create-expo-app."
                  }
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <Image
                  className="h-14 w-14 rounded-3xl bg-gray-50"
                  src="/ansh.jpeg"
                  alt="ansh"
                  width={56}
                  height={56}
                />
                <div className="text-base">
                  <div className="font-semibold text-white">Ansh Nanda</div>
                  <div className="mt-1 text-gray-500">
                    Software Engineer at Bluesky
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
