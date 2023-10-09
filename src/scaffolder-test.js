import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

import * as storybookScaffolder from './storybook.js';
import * as testingScaffolder from './testing/scaffolder.js';
import scaffold from './scaffolder.js';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(storybookScaffolder, 'default');
    sandbox.stub(testingScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the component library is scaffolded', async () => {
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
    storybookScaffolder.default
      .withArgs({projectRoot})
      .resolves({
        scripts: storybookScripts,
        devDependencies: storybookDevDependencies,
        vcsIgnore: {directories: storybookIgnoredDirectories, files: storybookIgnoredFiles}
      });
    testingScaffolder.default
      .withArgs({projectRoot, tests})
      .resolves({
        scripts: testingScripts,
        devDependencies: testingDevDependencies,
        vcsIgnore: {directories: testingIgnoredDirectories, files: testingIgnoredFiles},
        eslintConfigs: testingEslintConfigs
      });

    assert.deepEqual(
      await scaffold({projectRoot, tests}),
      {
        scripts: {...storybookScripts, ...testingScripts},
        eslintConfigs: ['react', ...testingEslintConfigs],
        dependencies: [
          'react',
          'react-dom',
          'prop-types'
        ],
        devDependencies: [
          ...testingDevDependencies,
          ...storybookDevDependencies
        ],
        vcsIgnore: {
          directories: [...testingIgnoredDirectories, ...storybookIgnoredDirectories],
          files: [...testingIgnoredFiles, ...storybookIgnoredFiles]
        }
      }
    );
  });
});
