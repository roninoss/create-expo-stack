const roadmapData = [
  {
    index: 0,
    version: "v2.10.x",
    date: "May",
    active: false,
    title: "NativeWindUI Styling Option",
    description:
      "A free preview of NativeWindUI, a set of beautifully designed components based on Apple's Human Interface Guidelines using NativeWind.",
  },
  {
    index: 1,
    version: "v2.11.x",
    date: "June",
    active: false,
    title: "Enhanced Testing Suite",
    description:
      "Stability of the CLI is incredbily important to us. We're going to be enhancing our testing suite to validate folder structure, file creation, formatting, and compilation of the generated code.",
  },
  {
    index: 2,
    version: "v2.12.x",
    date: "June",
    active: false,
    title: "Runtime Testing with Maestro",
    description:
      "Validate that the generated code is functions as expected. We'll ensure that navigation, component layout, and state management are all working as intended.",
  },
  {
    index: 3,
    version: "v2.13.x",
    date: "July",
    active: false,
    title: "Unified Design System",
    description:
      "Not much thought went into our current aesthetic. We'd like to introduce an elegant theme across all of our styling libraries for you to use so you focus more on what you're actually trying to build.",
  },
  {
    index: 4,
    version: "v2.14.x",
    date: "July",
    active: false,
    title: "Dark Mode Support",
    description:
      "Add a toggle within each variant of our templates to switch between light and dark modes, to enhance user interface accessibility.",
  },
];

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="relative py-8 text-center gap-8 flex flex-col justify-center items-center"
    >
      <div className="flex w-full max-w-3xl flex-col items-center px-4 sm:px-8">
        <div className="glow relative flex w-full flex-col items-center"></div>
        <h1 className="bg-gradient-to-r from-neutral-50 via-yellow-500 to-orange-500 bg-clip-text pb-6 text-center font-bold text-transparent text-3xl md:text-4xl">
          What&apos;s next for Create Expo Stack?
        </h1>
        <p className="w-full pb-12 px-8 md:px-16 md:text-lg text-center leading-loose text-transparent font-thin bg-gradient-to-r from-neutral-400/70 via-neutral-300/70 to-orange-200/70 bg-clip-text">
          This is a list of features we&apos;re working on, and what we intend
          to release in future versions. This list is subject to change and will
          be updated as we make progress.
        </p>
        <section className="grid pb-10 sm:pb-20 sm:-ml-[6.5rem] text-neutral-200">
          {roadmapData.map((item, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex w-full max-w-[80px] translate-y-4 items-start justify-end gap-6">
                <div className="flex flex-col items-end">
                  <h2
                    className={`-translate-y-1/4 text-sm ${
                      item.active
                        ? "font-bold bg-gradient-to-bl from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {item.version}
                  </h2>
                  <span className="text-right text-xs">{item.date}</span>
                </div>
                <div className={`${item.active ? "relative" : ""} flex h-full`}>
                  <div className="z-10 flex h-full w-[2px] rounded-sm bg-white/20"></div>
                  {item.active && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full h-6 w-2 z-10 ring-gray-500"></div>
                  )}
                </div>
              </div>
              <div
                className={`mb-2 flex w-full flex-col gap-2 rounded-lg bg-white/5 backdrop-saturate-150 px-4 py-4 backdrop-blur-[2px] ${
                  item.active && "rounded-t-3xl"
                }`}
              >
                <h3 className="text-left sm:text-center text-base font-bold sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-left sm:text-center text-sm font-light text-neutral-300/70 md:px-16">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </section>
        <div className="flex w-full flex-col gap-2 bg-white/5 backdrop-saturate-150 backdrop-blur-[2px] rounded-lg rounded-tl-3xl sm:rounded-tl-lg rounded-b-3xl -mt-10 sm:-mt-20 px-10 py-8 relative overflow-hidden">
          <h3 className="text-2xl font-bold">That&apos;s not all!</h3>
          <p className="text-neutral-300/70">
            We&apos;re always open to new ideas and feedback over{" "}
            <a
              className="font-bold bg-orange-200/30 px-2 py-0.5 rounded-3xl text-white hover:text-orange-300 hover:decoration-wavy underline hover:decoration-orange-300 duration-300 hover:py-3"
              href="https://rn.new/discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . If you feel like there&apos;s something missing in Create Expo
            Stack, you&apos;re welcome to pitch the core team in our Discord.
          </p>
        </div>
      </div>
    </section>
  );
}
