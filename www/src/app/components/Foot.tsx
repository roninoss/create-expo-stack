export default function Firebase() {
	return (
		<footer className="w-[90%] lg:w-[69%] 2xl:w-[60%] flex justify-center md:justify-between mx-auto text-white/70 p-4 py-12 sm:p-12 font-thin bg-gradient-to-t from-black to-transparent from-[69%] sm:-mt-12 z-50">
			<div className="flex flex-col gap-2 items-start">
				<div className="flex w-full justify-between">
					<span className="bg-white/30 border border-white/50 px-1.5 py-0.5 rounded-full text-xs">v2.2</span>
					<div className="flex gap-2 md:hidden ml-2">
						<a
							className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
							href="https://twitter.com/danstepanov"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								className="w-3.5 h-3.5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Twitter</title>
								<path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
							</svg>
						</a>
						<a
							className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
							href="https://github.com/danstepanov/create-expo-stack"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								className="w-3.5 h-3.5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>GitHub</title>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</a>
					</div>
				</div>
				<h1 className="text-xl font-bold text-white">create-expo-stack</h1>
				The most configurable way to create an Expo app.
				<br />
				<span className="text-sm">
					by @
					<a
						target="_blank"
						href="https://twitter.com/danstepanov"
						className="font-normal text-white underline decoration-wavy underline-offset-4 hover:underline-offset-1 duration-300"
					>
						onlydans
					</a>{' '}
					under the{' '}
					<a
						target="_blank"
						href="https://github.com/danstepanov/create-expo-stack?tab=MIT-1-ov-file#readme"
						className="font-normal text-white underline decoration-wavy underline-offset-4 hover:underline-offset-1 duration-300"
					>
						MIT
					</a>{' '}
					license.
				</span>
			</div>
			<div className="flex-col items-end justify-end md:flex hidden">
				<h1 className="text-xl font-bold text-white mb-1">Socials.</h1>
				<a
					className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
					href="https://twitter.com/danstepanov"
				>
					<div className="group-hover:text-white group-hover:-translate-x-2 duration-300">Twitter</div>
				</a>
				<a
					className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
					href="https://github.com/danstepanov/create-expo-stack"
				>
					<div className="group-hover:text-white group-hover:-translate-x-2 duration-300">Github</div>
				</a>
			</div>
		</footer>
	);
}
