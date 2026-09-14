import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const ejs = require('ejs');
const templates = join(import.meta.dir, '../src/templates');
const render = (file: string, props: object) => ejs.render(readFileSync(join(templates, file), 'utf8'), { props });
const parse = (source: string) => JSON.parse(source.replace(/,\s*([}\]])/g, '$1'));

for (const packageManager of ['npm', 'yarn', 'pnpm', 'bun']) {
  for (const styling of ['nativewind', 'nativewindui', 'stylesheet', 'unistyles']) {
    test(`${styling} dependencies and configuration with ${packageManager}`, () => {
      const props = {
        projectName: 'rc-test',
        projectSlug: 'rc-test',
        projectScheme: 'rc-test',
        stylingPackage: { name: styling, options: { selectedComponents: [] } },
        navigationPackage: { name: 'expo-router', type: 'navigation', options: { type: 'stack' } },
        packageManager,
        flags: {},
        packages: []
      };
      const pkg = parse(render('base/package.json.ejs', props));
      const deps = pkg.dependencies;
      const app = parse(render('base/app.json.ejs', props));
      const babel = { exports: undefined as any };
      runInNewContext(render('base/babel.config.js.ejs', props), { module: babel });
      const config = babel.exports({ cache() {} });
      const metro = { exports: undefined as any };
      runInNewContext(render('packages/expo-router/metro.config.js.ejs', props), {
        module: metro,
        __dirname: '/app',
        require(name: string) {
          if (name === 'expo/metro-config') return { getDefaultConfig: () => ({ base: true }) };
          return styling === 'nativewindui'
            ? { withNativeWind: (base: object, options: object) => ({ base, options, version: 4 }) }
            : { withNativewind: (base: object) => ({ base, version: 5 }) };
        }
      });
      if (styling === 'nativewind') {
        expect(deps.nativewind).toBe('5.0.0-rc.0');
        expect(deps['react-native-css']).toBe('3.1.0-rc.0');
        expect(deps.expo).toBe('~57.0.22');
        expect(deps['react-native']).toBe('0.86.3');
        expect(deps['react-native-reanimated']).toBe('4.5.1');
        expect(deps['react-native-worklets']).toBe('0.10.1');
        expect(deps['expo-router']).toBe('~57.0.21');
        expect(deps['@tailwindcss/postcss']).toBe('4.1.12');
        expect(pkg.devDependencies.tailwindcss).toBe('4.1.12');
        expect(app.expo.userInterfaceStyle).toBe('automatic');
        expect(app.expo.platforms).toContain('web');
        expect(config.presets).toEqual(['babel-preset-expo']);
        expect(metro.exports.version).toBe(5);
        const overrides =
          packageManager === 'yarn' ? pkg.resolutions : packageManager === 'pnpm' ? pkg.pnpm.overrides : pkg.overrides;
        expect(overrides.lightningcss).toBe('1.30.1');
      } else {
        expect(deps.expo).toBe('~57.0.4');
        expect(deps['react-native-css']).toBeUndefined();
        expect(deps['@tailwindcss/postcss']).toBeUndefined();
        if (styling === 'nativewindui') {
          expect(deps.nativewind).toBe('4.2.6');
          expect(pkg.devDependencies.tailwindcss).toBe('^3.4.17');
          expect(config.presets).toEqual([
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            'nativewind/babel'
          ]);
          expect(metro.exports).toEqual({
            base: { base: true },
            options: { input: './global.css', inlineRem: 16 },
            version: 4
          });
        } else {
          expect(deps.nativewind).toBeUndefined();
          expect(pkg.devDependencies.tailwindcss).toBeUndefined();
          expect(metro.exports).toEqual({ base: true });
        }
      }
    });
  }
}
