import "asciinema-player/dist/bundle/asciinema-player.css";
import "../../../styles/asciinema-theme-mine.css";

import { useEffect, useRef } from "react";

export default function CliDemo() {
  const cliDemoRef = useRef(null);

  useEffect(() => {
    (async function () {
      // @ts-ignore
      const AsciinemaPlayerLibrary = await import("asciinema-player");
      AsciinemaPlayerLibrary.create(
        window.innerWidth > 768 ? "demo-desktop.cast" : "demo-mobile.cast",
        cliDemoRef.current,
        {
          rows: window.innerWidth > 1024 ? 34 : null,
          fit: window.innerWidth > 1024 ? "none" : "width",
          theme: "mine",
          controls: false,
          autoPlay: true,
          loop: false,
        },
      );
    })();
  }, []);

  return (
    <div
      id="cli-demo"
      ref={cliDemoRef}
      className="relative w-[90%] lg:w-[69%] 2xl:w-[60%] h-[55vh] lg:h-[45.5rem] p-4 sm:p-5 lg:p-6 text-white/70 flex flex-col z-[1] rounded-2xl sm:rounded-3xl xl:rounded-[2rem] bg-white/10 overflow-wrap overflow-hidden backdrop-blur-sm opacity-75"
    ></div>
  );
}
