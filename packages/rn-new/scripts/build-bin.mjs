import fs from 'node:fs';
import path from 'node:path';

const command = process.argv[2];
const outputFile = path.join('bin', 'rn-new.js');
const outputContents = `#!/usr/bin/env node

try {
  require('create-expo-stack/bin/create-expo-stack.js');
} catch (error) {
  console.error('Error: Could not find create-expo-stack package.');
  console.error('Please ensure create-expo-stack is installed globally.');
  process.exit(1);
}
`;

if (command === 'clean') {
  fs.rmSync(path.dirname(outputFile), { recursive: true, force: true });
} else if (command === 'compile') {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, outputContents);
  fs.chmodSync(outputFile, 0o755);
} else {
  throw new Error(`Unknown build-bin command: ${command}`);
}
