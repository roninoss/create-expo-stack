/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['avatars.githubusercontent.com']
	},
	async redirects() {
		return [
			{
				source: '/discord',
				destination: 'https://discord.gg/2EnARBCR',
				permanent: true
			}
		]
	}
};

module.exports = nextConfig;
