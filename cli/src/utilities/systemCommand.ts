import { Toolbox } from 'gluegun/build/types/domain/toolbox';

type STDIO = 'inherit' | 'ignore' | 'pipe' | 'overlapped';

export const ONLY_ERRORS = ['ignore', 'ignore', 'inherit'] as const;

export function quoteShellArg(value: string): string {
  if (process.platform === 'win32') {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export async function runSystemCommand({
  command,
  errorMessage,
  stdio,
  toolbox,
  shell = true,
  env,
  cwd,
  failOnError = true
}: {
  command: string;
  toolbox: Toolbox;
  stdio: readonly [STDIO, STDIO, STDIO] | STDIO | undefined;
  errorMessage: string;
  shell?: boolean;
  env?: Record<string, string>;
  cwd?: string;
  failOnError?: boolean;
}) {
  const {
    print: { error },
    system
  } = toolbox;

  const result = await system.spawn(command, {
    shell,
    stdio,
    env: env ? { ...process.env, ...env } : process.env,
    cwd
  });

  if (failOnError && (result.error || result.status !== 0)) {
    error(`${errorMessage}: ${JSON.stringify(result)}`);

    error(`failed to run command: ${command}`);

    return process.exit(1);
  } else {
    return result.stdout;
  }
}
