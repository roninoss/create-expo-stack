interface Sponsor {
  id: number;
  name: string;
  html_url: string;
  image_url: string;
}

export function Sponsor({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      className="group text-neutral-300 relative rounded-full duration-300 hover:z-50 hover:scale-[1.2] focus:outline-none focus:duration-0 focus-visible:ring-0 active:scale-105 active:duration-100 lg:py-0.5"
      href={sponsor.html_url}
      rel="noreferrer noopener"
      target="_blank"
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full border border-neutral-700 px-3 py-1 text-sm opacity-0 shadow-xl backdrop-blur-md duration-300 group-hover:scale-100 group-hover:opacity-100 bg-black/50">
        {sponsor.name}
      </span>
      <img
        className="h-16 w-16 rounded-2xl bg-cover duration-300 group-hover:rounded-[2rem] group-focus:outline-none group-focus:duration-0 group-focus-visible:ring-2 group-active:rounded-3xl group-active:duration-100 sm:h-16 sm:w-16 sm:rounded-3xl"
        alt={`${sponsor.name}'s GitHub avatar`}
        src={sponsor.image_url}
        height={64}
        width={64}
      />
    </a>
  );
}
