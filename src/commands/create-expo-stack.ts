import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'create-expo-stack',
  description: 'Create an expo app, the right way.',
  run: async (toolbox) => {
    const { print, parameters, system, prompt } = toolbox

    let projectName = parameters.first
    let useExpoRouter = false
    let useReactNavigation = false
    let navigation = ''
    let navigationType = ''
    let branch = 'blank'

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

      // Ask about TypeScript
      const useTypescript = await prompt.confirm(
        'Would you like to use TypeScript with this project?',
        true
      )

      if (useTypescript) {
        print.success('Good call, now using TypeScript! 🚀')
      } else {
        print.success(`Wrong answer, we're gonna use Typescript.`)
      }

      // Ask about navigation
      const askNavigation = {
        type: 'select',
        name: 'navigationSelect',
        message: 'What would you like to use for Navigation?',
        choices: ['React Navigation', 'Expo Router', 'None'],
      }

      const askNavigationType = {
        type: 'select',
        name: 'navigationTypeSelect',
        message: 'What type of navigation would you like to use?',
        choices: ['Stack', 'Tab'],
      }

      const { navigationSelect } = await prompt.ask(askNavigation)

      if (navigationSelect !== 'None') {
        const { navigationTypeSelect } = await prompt.ask(askNavigationType)
        navigationType = navigationTypeSelect.toLowerCase()
        if (navigationSelect === 'React Navigation') {
          useReactNavigation = true
          navigation = 'react-navigation'
        } else {
          useExpoRouter = true
          navigation = 'expo-router'
        }
        print.success(`Great, we'll use ${navigationSelect}!`)
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

      if (!useExpoRouter && !useReactNavigation && !useNativewind) {
        branch = 'base'
      } else if (!useExpoRouter && !useReactNavigation && useNativewind) {
        branch = 'with-typescript-nativewind'
      } else if (useNativewind) {
        branch = `with-typescript-${navigation}-${navigationType}-nativewind`
      } else {
        branch = `with-typescript-${navigation}-${navigationType}`
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
