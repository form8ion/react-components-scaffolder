import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as storybookScaffolder from './storybook';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(storybookScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the component library is scaffolded', async () => {
    const projectRoot = any.string();
    const storybookScripts = any.simpleObject();
    const storybookDevDependencies = any.listOf(any.string);
    const storybookIgnoredDirectories = any.listOf(any.string);
    storybookScaffolder.default
      .withArgs({projectRoot})
      .resolves({
        scripts: storybookScripts,
        devDependencies: storybookDevDependencies,
        vcsIgnore: {directories: storybookIgnoredDirectories}
      });

    assert.deepEqual(
      await scaffold({projectRoot}),
      {
        scripts: storybookScripts,
        eslintConfigs: ['react'],
        dependencies: [
          'react',
          'react-dom',
          'prop-types'
        ],
        devDependencies: [
          'enzyme',
          'enzyme-adapter-react-16',
          ...storybookDevDependencies
        ],
        vcsIgnore: {directories: storybookIgnoredDirectories, files: []}
      }
    );
  });
});
