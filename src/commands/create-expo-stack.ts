import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'create-expo-stack',
  description: 'Create an expo app, the right way.',
  run: async (toolbox) => {
    const { print, parameters, system, prompt } = toolbox

    let projectName = parameters.first

    try {
      if (!projectName) {
        const askName = {
          type: 'input',
          name: 'name',
          message: 'What do you want to name your project? (my-expo-app)',
        }
        const { name } = await prompt.ask(askName)
        projectName = name
      }

      const useTypescript = await prompt.confirm(
        'Would you like to use TypeScript with this project?',
        true
      )

      if (useTypescript) {
        print.success('Good call, now using TypeScript! 🚀')
      } else {
        print.success(`Got it, we'll use JavaScript.`)
      }

      const useExpoRouter = await prompt.confirm(
        'Would you like to include navigation via Expo Router (recommended)?',
        true
      )

      if (useExpoRouter) {
        print.success(`Great, we'll set up a Tab Navigator!`)
      } else {
        print.success(`No problem, skipping navigation for now.`)
      }

      const useNativewind = await prompt.confirm(
        'Would you like to use NativeWind (Tailwind for RN) with this project?',
        true
      )

      if (useNativewind) {
        print.success(`You'll be styling with ease using Tailwind.`)
      } else {
        print.success(`Sounds good, you can use StyleSheet instead.`)
      }

      const githubRepo = 'https://github.com/danstepanov/create-expo-stack.git'
      let branch = 'blank'

      if (useTypescript && useExpoRouter && useNativewind) {
        branch = 'with-typescript-navigation-nativewind'
      }

      if (!useTypescript) {
        if (useExpoRouter && useNativewind) {
          branch = 'with-navigation-nativewind'
        } else if (useExpoRouter) {
          branch = 'with-navigation'
        } else if (useNativewind) {
          branch = 'with-nativewind'
        }
      }

      if (!useExpoRouter) {
        if (useNativewind) {
          branch = 'with-typescript-nativewind'
        } else if (useTypescript) {
          branch = 'with-typescript'
        }
      }

      if (!useNativewind && useTypescript && useExpoRouter) {
        branch = 'with-typescript-navigation'
      }

      if (!useTypescript && !useExpoRouter && !useNativewind) {
        branch = 'blank'
      }

      print.info(`Initializing your project...`)
      await system.run(
        `git clone --single-branch --branch ${branch} ${githubRepo} ${projectName} && cd ${projectName} && git branch -m ${branch} main && git remote remove origin`
      )
      print.success('Success! 🎉 Now, just run the following to get started: ')
      print.info(`cd ${projectName}`)
      print.info('yarn')
      print.info('yarn ios')
    } catch (error) {
      print.error(`Oops, unable to create your project 😢`)
      print.info(
        `\nIf this was unexpected, please open an issue: https://github.com/danstepanov/create-expo-stack#reporting-bugs--feedback`
      )
    }
  },
}

module.exports = command
