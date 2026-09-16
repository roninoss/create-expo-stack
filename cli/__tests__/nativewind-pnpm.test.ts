import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ejs = require('ejs');
const template = readFileSync(join(__dirname, '../src/templates/base/package.json.ejs'), 'utf8');

describe('Nativewind runtime dependencies', () => {
  for (const packageManager of ['pnpm', 'npm', 'yarn', 'bun']) {
    for (const styling of ['nativewind', 'nativewindui', 'stylesheet', 'unistyles']) {
      test(`${styling} with ${packageManager}`, () => {
        const manifest = JSON.parse(
          ejs.render(template, {
            props: {
              projectName: 'test-app',
              packageManager,
              stylingPackage: { name: styling, options: { selectedComponents: [] } }
            }
          })
        );

        if (packageManager === 'pnpm' && ['nativewind', 'nativewindui'].includes(styling)) {
          expect(manifest.dependencies['react-native-css-interop']).toBe('^0.2.7');
        } else {
          expect(manifest.dependencies).not.toHaveProperty('react-native-css-interop');
        }
      });
    }
  }
});
