import { Toolbox } from 'gluegun/build/types/domain/toolbox';

type STDIO = 'inherit' | 'ignore' | 'pipe' | 'overlapped';

export const ONLY_ERRORS = ['ignore', 'ignore', 'inherit'] as const;

export async function runSystemCommand({
  command,
  errorMessage,
  stdio,
  toolbox
}: {
  command: string;
  toolbox: Toolbox;
  stdio: readonly [STDIO, STDIO, STDIO] | STDIO | undefined;
  errorMessage: string;
}) {
  const {
    print: { error },
    system
  } = toolbox;

  const result = await system.spawn(command, {
    shell: true,
    stdio
  });

  if (result.error || result.status !== 0) {
    error(`${errorMessage}: ${JSON.stringify(result)}`);

    error(`failed to run command: ${command}`);

    return process.exit(1);
  }
}
