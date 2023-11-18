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
						<a
							className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
							href="https://discord.gg/2EnARBCR"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								className="w-3.5 h-3.5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Discord</title>
								<path d="M 20.8125 5.3847655 C 18.8222655 3.783203 15.673828 3.511719 15.5390625 3.501953 C 15.330078 3.484375 15.1308595 3.6015625 15.044922 3.794922 C 15.0371095 3.8066405 14.96875 3.964844 14.892578 4.2109375 C 16.2089845 4.433594 17.826172 4.8808595 19.2890625 5.7890625 C 19.5234375 5.933594 19.595703 6.2421875 19.451172 6.4765625 C 19.355469 6.6308595 19.1933595 6.714844 19.0253905 6.714844 C 18.935547 6.714844 18.84375 6.689453 18.761719 6.638672 C 16.246094 5.078125 13.105469 5.0 12.5 5.0 C 11.8945315 5.0 8.751953 5.078125 6.2382815 6.638672 C 6.0039065 6.7851565 5.6953125 6.7128905 5.5507815 6.4785155 C 5.404297 6.2421875 5.4765625 5.935547 5.7109375 5.7890625 C 7.173828 4.8828125 8.7910155 4.433594 10.107422 4.2128905 C 10.03125 3.964844 9.9628905 3.808594 9.9570315 3.794922 C 9.8691405 3.6015625 9.671875 3.480469 9.4609375 3.501953 C 9.326172 3.511719 6.1777345 3.783203 4.1601565 5.40625 C 3.107422 6.3808595 1.0 12.076172 1.0 17.0 C 1.0 17.0878905 1.0234375 17.171875 1.0664065 17.248047 C 2.5195315 19.8027345 6.486328 20.470703 7.390625 20.5 C 7.3945315 20.5 7.4003905 20.5 7.40625 20.5 C 7.5664065 20.5 7.716797 20.423828 7.810547 20.294922 L 8.7246095 19.0371095 C 6.2578125 18.4003905 4.998047 17.3183595 4.9257815 17.2539065 C 4.71875 17.0722655 4.699219 16.7558595 4.8828125 16.548828 C 5.064453 16.341797 5.3808595 16.3222655 5.5878905 16.5039065 C 5.6171875 16.53125 7.9375 18.5 12.5 18.5 C 17.0703125 18.5 19.390625 16.5234375 19.4140625 16.5039065 C 19.621094 16.324219 19.935547 16.341797 20.1191405 16.5507815 C 20.3007815 16.7578125 20.28125 17.0722655 20.074219 17.2539065 C 20.001953 17.3183595 18.7421875 18.4003905 16.2753905 19.0371095 L 17.189453 20.294922 C 17.283203 20.423828 17.433594 20.5 17.59375 20.5 C 17.5996095 20.5 17.605469 20.5 17.609375 20.5 C 18.513672 20.470703 22.480469 19.8027345 23.933594 17.248047 C 23.9765625 17.171875 24.0 17.0878905 24.0 17.0 C 24.0 12.076172 21.892578 6.3808595 20.8125 5.3847655 Z M 9.25 15.0 C 8.283203 15.0 7.5 14.105469 7.5 13.0 C 7.5 11.8945315 8.283203 11.0 9.25 11.0 C 10.216797 11.0 11.0 11.8945315 11.0 13.0 C 11.0 14.105469 10.216797 15.0 9.25 15.0 Z M 15.75 15.0 C 14.783203 15.0 14.0 14.105469 14.0 13.0 C 14.0 11.8945315 14.783203 11.0 15.75 11.0 C 16.716797 11.0 17.5 11.8945315 17.5 13.0 C 17.5 14.105469 16.716797 15.0 15.75 15.0 Z" />
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
				<a
					className="group p-1 hover:underline decoration-wavy underline-offset-1 hover:underline-offset-4 duration-300"
					href="https://discord.gg/2EnARBCR"
				>
					<div className="group-hover:text-white group-hover:-translate-x-2 duration-300">Discord</div>
				</a>
			</div>
		</footer>
	);
}
