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
          message: 'What is your project named?',
        }
        const { name } = await prompt.ask(askName)
        projectName = name
      }

      const useTypescript = await prompt.confirm(
        'Would you like to use TypeScript with this project?',
        true
      )

      const useExpoRouter = await prompt.confirm(
        'Would you like to include navigation via Expo Router (recommended)?',
        true
      )
      const useNativewind = await prompt.confirm(
        'Would you like to use NativeWind with this project?',
        true
      )

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

      print.info(`Cloning the ${branch} template of ${githubRepo}...`)
      await system.run(
        `git clone --single-branch --branch ${branch} ${githubRepo} ${projectName} && cd ${projectName} && git branch -m ${branch} main && git remote remove origin`
      )
      print.success(
        `Success! Now, just run "cd ${projectName}" followed by "yarn && yarn ios" or "npm i && npm run ios" to start working on your project! 🎉`
      )
    } catch (error) {
      print.error(
        `Failed to create project 😢 Please open an issue at https://github.com/danstepanov/create-expo-stack`
      )
    }
  },
}

module.exports = command
