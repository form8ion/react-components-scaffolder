import {it, expect, describe, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import scaffoldTesting from './testing/index.js';
import scaffoldStorybook from './storybook.js';
import scaffold from './scaffolder.js';

vi.mock('./testing/index.js');
vi.mock('./storybook.js');

describe('scaffolder', () => {
  it('should scaffold the component library', async () => {
    const projectRoot = any.string();
    const storybookScripts = any.simpleObject();
    const storybookDevDependencies = any.listOf(any.string);
    const storybookIgnoredDirectories = any.listOf(any.string);
    const storybookIgnoredFiles = any.listOf(any.string);
    const testingDevDependencies = any.listOf(any.string);
    const testingScripts = any.simpleObject();
    const testingIgnoredDirectories = any.listOf(any.string);
    const testingIgnoredFiles = any.listOf(any.string);
    const testingEslintConfigs = any.listOf(any.string);
    const tests = any.simpleObject();
    when(scaffoldStorybook)
      .calledWith({projectRoot})
      .thenResolve({
        scripts: storybookScripts,
        dependencies: {javascript: {development: storybookDevDependencies}},
        vcsIgnore: {directories: storybookIgnoredDirectories, files: storybookIgnoredFiles}
      });
    when(scaffoldTesting)
      .calledWith({projectRoot, tests})
      .thenResolve({
        scripts: testingScripts,
        dependencies: {javascript: {development: testingDevDependencies}},
        vcsIgnore: {directories: testingIgnoredDirectories, files: testingIgnoredFiles},
        eslintConfigs: testingEslintConfigs
      });

    expect(await scaffold({projectRoot, tests})).toEqual({
      scripts: {...storybookScripts, ...testingScripts},
      eslintConfigs: ['react', ...testingEslintConfigs],
      dependencies: {
        javascript: {
          production: [
            'react',
            'react-dom',
            'prop-types'
          ],
          development: [
            ...testingDevDependencies,
            ...storybookDevDependencies
          ]
        }
      },
      vcsIgnore: {
        directories: [...testingIgnoredDirectories, ...storybookIgnoredDirectories],
        files: [...testingIgnoredFiles, ...storybookIgnoredFiles]
      }
    });
  });
});
