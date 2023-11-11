import Image from 'next/image';

export default function ExpoRouter() {
	return (
		<a
			target="_blank"
			href="https://docs.expo.dev/routing/introduction/"
			className="group relative overflow-hidden shadow-[inset_0_0_3rem_#fff4] hover:shadow-[inset_0_0_8rem_#fff4,0_0_2rem_#fff4] border-white/40 hover:border-white/80 bg-white/10 backdrop-blur-sm border text-white p-4 sm:pr-8 w-full md:w-auto flex-grow rounded-3xl flex flex-col items-start duration-500"
		>
			<Image
				className="absolute -right-3 -top-3 sm:opacity-40 opacity-10 -z-[1] group-hover:scale-110 group-hover:rotate-[33deg] duration-[600ms]"
				src="/stack/expo.svg"
				alt="expo"
				width={96}
				height={96}
			/>
			<Image
				className="absolute right-2 top-2 shadow-xl opacity-40 sm:opacity-100 -z-[1] group-hover:rotate-[30deg] group-hover:scale-105 duration-500"
				src="/stack/expo.svg"
				alt="expo"
				width={56}
				height={56}
			/>
			<div className="bg-white/80 group-hover:bg-white duration-500 font-bold text-black rounded-full px-2 text-sm">
				v2
			</div>
			<h1 className="text-2xl mt-2">Expo Router</h1>
			<span className="font-thin max-w-[24ch]">File-based navigation with Expo</span>
		</a>
	);
}
