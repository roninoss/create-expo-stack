import { Geologica } from 'next/font/google';

import './globals.css';
import Foot from './components/Foot';

const geologica = Geologica({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>Create Expo Stack</title>
				<meta property="description" content="The easiest way to create a React Native app with Expo" />
				<meta property="og:title" content="Create Expo Stack"></meta>
				<meta property="og:description" content="The easiest way to create a React Native app with Expo" />
				<meta property="og:url" content="https://expostack.dev"></meta>
				<meta property="og:image" content="https://expostack.dev/api/og" />
				<meta property="og:image:alt" content="Create Expo Stack" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="twitter:image" content="https://expostack.dev/api/og"></meta>
				<meta property="twitter:card" content="summary_large_image"></meta>
				<meta property="twitter:title" content="Create Expo Stack"></meta>
				<meta
					property="twitter:description"
					content="The easiest way to create a React Native app with Expo"
				></meta>
			</head>
			<body className={`flex flex-col bg-gradient-to-b from-black via-[#111] to-black ${geologica.className}`}>
				{children}
				<Foot />
			</body>
		</html>
	);
}
