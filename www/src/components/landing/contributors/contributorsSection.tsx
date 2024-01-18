import { CONTRIBUTORS } from "../../../config";
import { Contributor } from "./contributor";
import GitHubIcon from "@components/icons/github";

export default function ContributorsSection() {
  return (
    <section className="relative mt-12 sm:mt-40 z-[1] w-[90%] lg:w-[70%] sm:w-auto pb-24">
      <svg
        className="-inset-[50%] sm:-inset-[20%] absolute w-[200%] h-[200%] sm:w-[140%] sm:h-[140%] -z-10 animate-[spin_60s_linear_infinite_reverse] fill-neutral-900"
        viewBox="0 0 88 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M35.7886 3.94375C40.367 -0.485401 47.633 -0.485401 52.2114 3.94375C54.8296 6.47653 58.47 7.65939 62.0769 7.14922C68.3842 6.25708 74.2626 10.528 75.3632 16.8023C75.9926 20.3903 78.2425 23.4871 81.4604 25.1944C87.0876 28.18 89.3329 35.0904 86.5353 40.8134C84.9356 44.0861 84.9356 47.9139 86.5353 51.1866C89.3329 56.9096 87.0876 63.82 81.4604 66.8056C78.2425 68.513 75.9926 71.6097 75.3632 75.1977C74.2626 81.472 68.3842 85.7429 62.0769 84.8508C58.47 84.3406 54.8296 85.5235 52.2114 88.0563C47.633 92.4854 40.367 92.4854 35.7886 88.0563C33.1704 85.5235 29.53 84.3406 25.9231 84.8508C19.6158 85.7429 13.7374 81.472 12.6368 75.1977C12.0074 71.6097 9.75747 68.513 6.5396 66.8056C0.912426 63.82 -1.33291 56.9096 1.46466 51.1866C3.06443 47.9139 3.06443 44.0861 1.46466 40.8134C-1.33291 35.0904 0.912426 28.18 6.5396 25.1944C9.75747 23.4871 12.0074 20.3903 12.6368 16.8023C13.7374 10.528 19.6158 6.25708 25.9231 7.14922C29.53 7.65939 33.1704 6.47653 35.7886 3.94375Z" />
      </svg>
      <h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-6 pt-24 2xl:pt-16">
        Community
      </h1>
      <div className="flex flex-col items-center gap-12">
        <p className="text-neutral-200/70 max-w-[50ch] text-center font-thin leading-loose">
          Create Expo Stack is open-source and built by developers just like
          you. These are some of the contributors who made this possible so far.
        </p>
        {/* honeycomb grid for the future */}
        {/* [&>*:nth-child(9n_+_1)]:ml-[1.875rem] sm:[&>*:nth-child(9n_+_1)]:ml-[2.375rem] */}
        <div className="flex justify-center flex-wrap gap-3 w-[18rem] sm:w-[32.5rem] lg:w-[37.25rem]">
          {CONTRIBUTORS.map((contributor) => (
            <Contributor
              contributor={contributor}
              key={CONTRIBUTORS.indexOf(contributor)}
            />
          ))}
        </div>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/danstepanov/create-expo-stack/blob/main/contributing.md"
          className="cursor-pointer bg-neutral-700 rounded-full px-3 py-2 flex hover:no-underline text-neutral-200 hover:bg-neutral-600 duration-300 items-center"
        >
          <GitHubIcon className="mr-2 h-5 w-5" />
          Contribute on GitHub
        </a>
      </div>
    </section>
  );
}
