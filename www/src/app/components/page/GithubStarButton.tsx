const GithubStarButton = () => {
  return (
    <a
      target="_blank"
      href="https://github.com/danstepanov/create-expo-stack"
      className="text-sm m-2 md:text-base group border border-zinc-400 bg-zinc-500/50 rounded-full p-2 px-3 sm:p-1 sm:px-2 mx-auto flex gap-2 items-center text-zinc-50 font-thin duration-300 hover:bg-zinc-700/50 hover:border-zinc-300 shadow-[0_0_0.5rem_0] shadow-zinc-500 hover:shadow-[0_0_1.5rem_0] hover:shadow-zinc-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="duration-300 group-hover:rotate-180 lucide lucide-sparkles"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
      <span className="hidden sm:block">Give us a star on Github</span>
      <span className="sm:hidden">Star us on Github</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="duration-300 group-hover:translate-x-0.5 lucide lucide-chevron-right"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </a>
  );
};

export default GithubStarButton;
