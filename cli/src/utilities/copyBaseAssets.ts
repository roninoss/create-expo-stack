import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export async function copyBaseAssets(projectName: string, toolbox: Toolbox) {
  return await toolbox.filesystem.copyAsync(
    toolbox.filesystem.path(
      toolbox.plugin.directory,
      'templates',
      'base/assets'
    ),
    toolbox.filesystem.path(projectName, 'assets'),
    {
      overwrite: true,
    }
  )
}
