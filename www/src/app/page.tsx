"use client";
import { Analytics } from "@vercel/analytics/react";

import CopyCommandButton from "./components/page/CopyCommandButton";
import BackgroundSVG from "./components/page/BackgroundSVG";
import Contributors from "./components/page/Contributors";
import Testimonials from "./components/page/Testimonials";
import CliDemo from "./components/page/CliDemo";
import Nav from "./components/Nav";

import TypeScript from "./components/stack/TypeScript";
import ExpoRouter from "./components/stack/ExpoRouter";
import NativeWind from "./components/stack/NativeWind";
import ReactNavigation from "./components/stack/ReactNavigation";
import Supabase from "./components/stack/Supabase";
import Firebase from "./components/stack/Firebase";
import Tamagui from "./components/stack/Tamagui";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full relative overflow-hidden">
      <BackgroundSVG />
      <Nav />
      {/* everything is z-1 to sit on top of <BackgroundSVG /> */}
      {/* aspect-square container to match dimensions of aspect-square BackgroundSVG */}
      <section className="z-[1] flex flex-col items-center w-full relative lg:aspect-square gap-16 pt-14">
        <h1 className="w-10/12 max-w-screen-lg text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-[4rem] xl:text-[4rem] bg-clip-text bg-gradient-to-t from-zinc-400 to-33% to-white">
          The most configurable way to create an{" "}
          <span className="bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-xl">
            Expo
          </span>{" "}
          app
        </h1>
        <CopyCommandButton />
        <CliDemo />
        <div className="flex flex-wrap gap-4 pt-4 w-[90%] lg:w-[69%] 2xl:w-[60%]">
          <TypeScript />
          <NativeWind />
          <ReactNavigation />
          <Tamagui />
          <ExpoRouter />
          <Supabase />
          <Firebase />
        </div>
      </section>
      <section className="z-10 w-[90%] lg:w-[70%] sm:w-auto">
        <Testimonials />
      </section>
      <section className="relative mt-12 sm:mt-40 z-[1] w-[90%] lg:w-[70%] sm:w-auto pb-24">
        <svg
          className="-inset-[20%] absolute w-[140%] h-[140%] -z-10 animate-[spin_60s_linear_infinite_reverse] fill-neutral-900"
          viewBox="0 0 88 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M35.7886 3.94375C40.367 -0.485401 47.633 -0.485401 52.2114 3.94375C54.8296 6.47653 58.47 7.65939 62.0769 7.14922C68.3842 6.25708 74.2626 10.528 75.3632 16.8023C75.9926 20.3903 78.2425 23.4871 81.4604 25.1944C87.0876 28.18 89.3329 35.0904 86.5353 40.8134C84.9356 44.0861 84.9356 47.9139 86.5353 51.1866C89.3329 56.9096 87.0876 63.82 81.4604 66.8056C78.2425 68.513 75.9926 71.6097 75.3632 75.1977C74.2626 81.472 68.3842 85.7429 62.0769 84.8508C58.47 84.3406 54.8296 85.5235 52.2114 88.0563C47.633 92.4854 40.367 92.4854 35.7886 88.0563C33.1704 85.5235 29.53 84.3406 25.9231 84.8508C19.6158 85.7429 13.7374 81.472 12.6368 75.1977C12.0074 71.6097 9.75747 68.513 6.5396 66.8056C0.912426 63.82 -1.33291 56.9096 1.46466 51.1866C3.06443 47.9139 3.06443 44.0861 1.46466 40.8134C-1.33291 35.0904 0.912426 28.18 6.5396 25.1944C9.75747 23.4871 12.0074 20.3903 12.6368 16.8023C13.7374 10.528 19.6158 6.25708 25.9231 7.14922C29.53 7.65939 33.1704 6.47653 35.7886 3.94375Z" />
        </svg>

        <Contributors />
      </section>
      <Analytics />
    </main>
  );
}
