import Image from "next/image";

export default function ReactNavigation() {
  return (
    <a
      target="_blank"
      href="https://reactnavigation.org/"
      className="group relative overflow-hidden shadow-[inset_0_0_3rem_#7b61c144] hover:shadow-[inset_0_0_8rem_#7b61c144,0_0_2rem_#7b61c144] border-[#7b61c1]/90 hover:border-[#7b61c1] bg-[#7b61c1]/20 backdrop-blur-sm border text-purple-200 p-4 sm:pr-20 flex-grow rounded-3xl flex flex-col items-start duration-500"
    >
      <Image
        className="absolute -right-3 -top-3 sm:opacity-40 opacity-10 -z-[1] group-hover:scale-110 group-hover:rotate-[30deg] duration-500"
        src="/stack/react-navigation.svg"
        alt="react navigation"
        width={96}
        height={96}
      />
      <Image
        className="absolute right-2 top-2 opacity-40 sm:opacity-100 -z-[1] group-hover:-rotate-[30deg] group-hover:scale-105 duration-500"
        src="/stack/react-navigation.svg"
        alt="react navigation"
        width={56}
        height={56}
      />
      <div className="bg-[#7b61c1] group-hover:bg-[#9b81e1] duration-500 font-bold text-black rounded-full px-2 text-sm">
        v6
      </div>
      <h1 className="text-2xl mt-2">React Navigation</h1>
      <span className="font-thin max-w-[24ch]">
        Configuration-based navigation
      </span>
    </a>
  );
}
