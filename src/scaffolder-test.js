import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as storybookScaffolder from './storybook';
import * as testingScaffolder from './testing';
import scaffold from './scaffolder';

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
    const testingDevDependencies = any.listOf(any.string);
    const tests = any.simpleObject();
    storybookScaffolder.default
      .withArgs({projectRoot})
      .resolves({
        scripts: storybookScripts,
        devDependencies: storybookDevDependencies,
        vcsIgnore: {directories: storybookIgnoredDirectories}
      });
    testingScaffolder.default.withArgs({tests}).resolves({devDependencies: testingDevDependencies});

    assert.deepEqual(
      await scaffold({projectRoot, tests}),
      {
        scripts: storybookScripts,
        eslintConfigs: ['react'],
        dependencies: [
          'react',
          'react-dom',
          'prop-types'
        ],
        devDependencies: [
          ...testingDevDependencies,
          ...storybookDevDependencies
        ],
        vcsIgnore: {directories: storybookIgnoredDirectories, files: []}
      }
    );
  });
});
