import Image from 'next/image';

export default function Firebase() {
	return (
		<div className="group relative overflow-hidden cursor-wait hover:rounded-xl duration-300 shadow-[inset_0_0_3rem_#FFCA2844] border-[#FFCA28]/70 bg-[#FFCA28]/10 backdrop-blur-sm border text-[#FFEA48]/80 p-4 sm:pr-8 flex-grow rounded-3xl flex flex-col items-start">
			<Image
				className="absolute -right-3 -top-3 opacity-10 -z-[1] group-hover:scale-110 group-hover:-rotate-6 duration-300"
				src="/stack/firebase.svg"
				alt="firebase"
				width={96}
				height={96}
			/>
			<Image
				className="absolute right-2 top-2 opacity-40 -z-[1] group-hover:-rotate-12 group-hover:scale-105 duration-300"
				src="/stack/firebase.svg"
				alt="firebase"
				width={56}
				height={56}
			/>
			<div className="bg-[#FFCA28]/90 font-bold text-black rounded-full px-2 text-sm">v10</div>
			<h1 className="text-2xl mt-2">Firebase</h1>
			<span className="font-thin max-w-[24ch]">Backend as a service from Google</span>
		</div>
	);
}
