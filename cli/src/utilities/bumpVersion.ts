import { execSync } from 'child_process'

function bumpVersion(type: string) {
  if (['major', 'minor', 'patch'].includes(type)) {
    try {
      execSync(`npm version ${type}`, { stdio: 'inherit' })
      console.log(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } version bumped successfully.`,
      )
    } catch (error) {
      console.error(`Error bumping the ${type} version:`, error)
    }
  } else {
    console.error(
      'Invalid version type. Please use "major", "minor", or "patch".',
    )
  }
}

// Get the argument from the command line
const versionType = process.argv[2]
bumpVersion(versionType)
