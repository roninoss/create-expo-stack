import { SPONSORS } from "../../../config";
import { Sponsor } from "./sponsor";

export default function SponsorsSection() {
  return (
    <section className="relative  sm:mt-20 z-[1] w-[90%] lg:w-[70%] sm:w-auto pb-10 sm:pb-24">
      <h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-6 pt-24 2xl:pt-16">
        Sponsors
      </h1>
      <div className="w-full flex items-center justify-center">
        <div className="text-white items-center justify-center flex flex-wrap mb-6 max-w-[40ch] sm:max-w-[50ch] mx-auto text-center">
          <span className="text-balance font-thin text-neutral-200/70">
            Support this project by{" "}
            <a
              href="https://github.com/sponsors/danstepanov"
              target="_blank"
              className="underline underline-offset-2 hover:text-white text-white/80 duration-150"
            >
              becoming a sponsor
            </a>
            . <br /> Your logo will show up here with a link to your website.{" "}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap gap-6 w-[18rem]items-center justify-center sm:w-[23rem]">
          {SPONSORS.map((sponsor) => (
            <Sponsor sponsor={sponsor} key={SPONSORS.indexOf(sponsor)} />
          ))}
        </div>
      </div>
    </section>
  );
}
