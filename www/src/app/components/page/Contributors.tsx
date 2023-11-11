import { contributors } from '../../../../public/contributors';
import { Contributor } from '../Contributor';
import { AiFillGithub } from 'react-icons/ai';
export default function Testimonials() {
	return (
		<>
			<h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-6 pt-24 2xl:pt-16">
				Community
			</h1>
			<div className="flex flex-col items-center gap-6">
				<p className="text-neutral-200 max-w-[50ch] text-center leading-loose">
					Create Expo Stack is open-source and built by developers just like you. These are some of the
					contributors who made this possible so far.
				</p>
				{/* honeycomb grid for the future */}
				{/* [&>*:nth-child(9n_+_1)]:ml-[1.875rem] sm:[&>*:nth-child(9n_+_1)]:ml-[2.375rem] */}
				<div className="flex flex-wrap gap-3 w-[18rem] sm:w-[23rem]">
					{contributors.map((contributor) => (
						<Contributor contributor={contributor} key={contributors.indexOf(contributor)} />
					))}
				</div>
				<a
					href="https://github.com/danstepanov/create-expo-stack/blob/main/contributing.md"
					className="cursor-pointer bg-neutral-700 rounded-full px-3 py-2 flex text-neutral-200 hover:bg-neutral-600 duration-300 items-center"
				>
					<AiFillGithub className="mr-2 h-5 w-5" />
					Contribute on GitHub
				</a>
			</div>
		</>
	);
}
