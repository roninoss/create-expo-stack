import { Toolbox } from 'gluegun/build/types/domain/toolbox';

type STDIO = 'inherit' | 'ignore' | 'pipe' | 'overlapped';

export const ONLY_ERRORS = ['ignore', 'ignore', 'inherit'] as const;

export async function runSystemCommand({
  command,
  errorMessage,
  stdio,
  toolbox,
  shell = true,
  env
}: {
  command: string;
  toolbox: Toolbox;
  stdio: readonly [STDIO, STDIO, STDIO] | STDIO | undefined;
  errorMessage: string;
  shell?: boolean;
  env?: Record<string, string>;
}) {
  const {
    print: { error },
    system
  } = toolbox;

  const result = await system.spawn(command, {
    shell,
    stdio,
    env
  });

  if (result.error || result.status !== 0) {
    error(`${errorMessage}: ${JSON.stringify(result)}`);

    error(`failed to run command: ${command}`);

    return process.exit(1);
  }
}
