import Image from 'next/image';
import DoubleQuote from './DoubleQuote';
import { useRef } from 'react';

const authors = [
	{
		name: 'Ansh Nanda',
		position: 'Software Engineer at Bluesky',
		image: '/ansh.jpeg',
		alt: 'ansh',
		testimonial:
			"This is great! I've been using this for a ton of proof of concept applications. This serves my needs better than using create-expo-app."
	},
	{
		name: 'Yefim Vedernikoff',
		position: 'Software Engineer at Partiful',
		image: '/yefim.jpeg',
		alt: 'yefim',
		testimonial:
			"Thanks for building create-expo-stack! It's helped our team to quickly spin up apps and test various modules prior to adding them to our production application."
	},
	{
		name: 'Agustín Falco',
		position: 'Software Engineer at Vercel',
		image: '/agustin.jpeg',
		alt: 'agustin',
		testimonial: 'I’ve been checking out create-expo-stack! Very nice!!'
	},
	{
		name: 'nexxel',
		position: 'Software Engineer at Dimension',
		image: '/nexxel.jpeg',
		alt: 'nexxel',
		testimonial: 'Building a mobile app soon, def will use create-expo-stack!'
	}
];

export default function Testimonials() {
	const innerScrollerRef = useRef<HTMLDivElement | null>(null);

	interface Author {
		name: string;
		position: string;
		image: string;
		alt: string;
		testimonial: string;
	}

	const Testimonial = (author: Author) => {
		return (
			<div className="flex flex-col sm:-ml-[0.5px] border-white/20 pt-16 sm:border-l sm:pr-8 sm:pt-0 sm:pl-16">
				<figure className="flex flex-auto flex-col justify-between">
					<blockquote className="text-lg leading-8 text-white relative">
						<DoubleQuote />
						<p className="max-w-[40ch]">{author.testimonial}</p>
					</blockquote>
					<figcaption className="mt-10 flex items-center gap-x-6">
						<Image
							className="h-14 w-14 rounded-3xl bg-gray-50"
							src={author.image}
							alt={author.alt}
							width={56}
							height={56}
						/>
						<div className="text-base">
							<div className="font-semibold text-white">{author.name}</div>
							<div className="mt-1 text-gray-500">{author.position}</div>
						</div>
					</figcaption>
				</figure>
			</div>
		);
	};

	return (
		<>
			<h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] xl:text-[4rem] pb-16 pt-24 2xl:pt-0">
				What people are saying
			</h1>
			<div className="infinite-scroll-x-container mx-auto max-w-7xl px-6 sm:px-8">
				<div
					ref={innerScrollerRef}
					className="infinite-scroll-x sm:w-max sm:pt-8 relative sm:flex flex-nowrap mx-auto grid max-w-2xl grid-cols-1 sm:mx-0 sm:max-w-none"
				>
					{authors.map((author: Author) => Testimonial(author))}
				</div>
			</div>
		</>
	);
}
