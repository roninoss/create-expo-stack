// export types
export interface CliFlags {
  noGit: boolean
  noInstall: boolean
  importAlias: string
}

export const availablePackages = [
  'nativewind',
  'tamagui',
  'react-navigation',
  'expo-router',
  'stylesheet',
  'expo-updates',
] as const

export type NavigationTypes = 'stack' | 'tabs' | undefined

export type AvailablePackages = {
  name: (typeof availablePackages)[number]
  type: 'navigation' | 'styling' | 'releaseWorkflow'
  options?: { type?: NavigationTypes }
}

export interface CliResults {
  projectName: string
  packages: AvailablePackages[]
  flags: CliFlags
}

export type CliFeatureType = {
  type: string
  name: string
  message: string
  choices: Array<string>
}
