export function showHelp(info, highlight, warning) {
	info('')
	highlight('  Info')
	info('    Creates a new configurable Expo project')
	info('')
	highlight('  Usage')
	warning('    $ npx create-expo-stack <project_name> [options]')
	info('')
	highlight('  Options')
	info(
		'    -d, --default         Use the default options for creating a project',
	)
	info('        --noInstall       Skip installing npm packages or CocoaPods')
	info('        --noGit           Skip initializing a git repository')
	info('        --blank           Use the blank typescript template')
	info('        --npm             Use npm as the package manager')
	info('        --yarn            Use yarn as the package manager')
	info('        --pnpm            Use pnpm as the package manager')
	info('	--bun		  Use bun as the package manager')
	info('    -v, --version         Version number')
	info('    -h, --help            Usage info')
	info('')
	highlight('   Navigation Package Options')
	info('    	--exporouter      Use Expo Router for navigation')
	info('    	--reactnavigation Use React Navigation for navigation')
	info('    	--tabs            Use tabs for navigation')
	info('')
	highlight('   Authentication Package Options')
	info('    	--firebase        Use Firebase for authentication')
	info('    	--supabase        Use Supabase for authentication')
	info('')
	highlight('   Styling Package Options')
	info('    	--nativewind      Use Nativewind for styling')
	info('    	--tamagui         Use Tamagui for styling')
	info('	--stylesheet      Use StyleSheet for styling')
	info('')
	highlight('   Opinionated Stacks')
	info('    -i, --ignite          Use Ignite to create an opinionated stack')
	info('')

	highlight('   Non-Interactive Usage')
	info(
		'    If you know the options you want to use, you can pass them in via the',
	)
	info(
		'    command line. This will skip the interactive CLI and use the options',
	)
	info('    you pass in. This is also useful for CI/CD environments.')
	info('')
	info('    For example:')
	info(' ')
	warning(
		'    $ npx create-expo-stack myProject --reactnavigation --nativewind --noInstall',
	)
	info('')
}
