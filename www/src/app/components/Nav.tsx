'use client';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import GithubStarButton from './page/GithubStarButton';
// import { useState } from 'react';
import { useFormattedStars } from '@/app/utilities/FetchGithubStar';

const Nav = () => {
	const formattedStars = useFormattedStars();
	const isRtl = true;

	return (
		<nav className="z-[1] flex p-[0.5%] xl:p-[1%] 2xl:p-[1.5%] text-white justify-between items-center w-full">
			{/* <Logo /> */}
			<div className="w-14 h-14"></div>
			<GithubStarButton />
			<div
				id="github-star"
				className={`
          relative hidden items-center rounded-lg border border-t3-purple-200/50 bg-t3-purple-200/50 bg-clip-padding px-2 py-1 text-slate-800 no-underline !transition-colors !duration-300 group-hover:border-t3-purple-200/75 group-hover:bg-t3-purple-200/75 ltr:mr-[.33em] rtl:ml-[.33em] dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:text-slate-100 dark:group-hover:border-t3-purple-200/50 dark:group-hover:bg-t3-purple-200/10 md:flex
          ${
				isRtl
					? 'after:absolute after:h-0 after:w-0 after:border-8 after:border-transparent after:transition-colors after:duration-300 after:left-[calc(-0.5em-1px)] after:border-l-0 after:border-r-t3-purple-200/50 after:group-hover:border-r-t3-purple-200/75 dark:after:border-r-t3-purple-200/20 dark:after:group-hover:border-r-t3-purple-200/50'
					: 'after:absolute after:h-0 after:w-0 after:border-8 after:border-transparent after:transition-colors after:duration-300 after:right-[calc(-0.5em-1px)] after:border-r-0 after:border-l-t3-purple-200/50 after:group-hover:border-l-t3-purple-200/75 dark:after:border-l-t3-purple-200/20 dark:after:group-hover:border-l-t3-purple-200/50'
			}
        `}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
					className="h-4 w-4 fill-slate-900 transition-colors duration-300 [margin-inline-end:4px] dark:fill-t3-purple-100"
				>
					<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
				</svg>
				{formattedStars}
			</div>
			<Link target="_blank" href="https://github.com/danstepanov/create-expo-stack">
				<AiFillGithub className="m-2 h-10 w-10" />
			</Link>
		</nav>
	);
};

export default Nav;
