import { SPONSORS } from "../../../config";
import { Sponsor } from "./sponsor";

export default function SponsorsSection() {
  return (
    <section className="relative mt-12 sm:mt-20 z-[1] w-[90%] lg:w-[70%] sm:w-auto pb-24">
      <h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-6 pt-24 2xl:pt-16">
        Sponsors
      </h1>
      <div className="flex flex-col items-center gap-6">
        {/* honeycomb grid for the future */}
        {/* [&>*:nth-child(9n_+_1)]:ml-[1.875rem] sm:[&>*:nth-child(9n_+_1)]:ml-[2.375rem] */}
        <div className="flex flex-wrap gap-6 w-[18rem]items-center justify-center sm:w-[23rem]">
          {SPONSORS.map((sponsor) => (
            <Sponsor sponsor={sponsor} key={SPONSORS.indexOf(sponsor)} />
          ))}
        </div>
      </div>
    </section>
  );
}
