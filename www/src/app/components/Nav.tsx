'use client';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import GithubStarButton from './page/GithubStarButton';
import { useFormattedStars } from '@/app/utilities/FetchGithubStar';

const Nav = () => {
	const formattedStars = useFormattedStars();

	return (
		<nav className="z-[1] flex p-[0.5%] xl:p-[1%] 2xl:p-[1.5%] text-white justify-between items-center w-full">
			{/* <Logo /> */}
			<div className="w-14 h-14"></div>

			<GithubStarButton />
			<div className=" hidden md:block">
				<a
					target="_blank"
					href="https://github.com/danstepanov/create-expo-stack"
					className="flex py-1 px-[0.38rem] border border-zinc-400 bg-zinc-500/50 rounded-md text-zinc-50 font-extralight hover:bg-zinc-700/50 hover:border-zinc-300 shadow-[0_0_0.5rem_0] shadow-zinc-500 hover:shadow-[0_0_1.5rem_0] hover:shadow-zinc-400"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						className="h-4 w-4 fill-[#FAFAFA] [margin-inline-end:4px]  self-center"
					>
						<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
					</svg>
					{formattedStars}
				</a>
			</div>
			<Link target="_blank" href="https://github.com/danstepanov/create-expo-stack">
				<AiFillGithub className="m-2 h-10 w-10" />
			</Link>
		</nav>
	);
};

export default Nav;
