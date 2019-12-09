import {promises, promises as fsPromises} from 'fs';
import {resolve} from 'path';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as mkdir from '../thirdparty-wrappers/make-dir';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(mkdir, 'default');
    sandbox.stub(fsPromises, 'copyFile');
  });

  teardown(() => sandbox.restore());

  test('that the component library is scaffolded', async () => {
    const projectRoot = any.string();
    const pathToCreatedDirectory = any.string();
    const storybookBuildDirectory = 'storybook-static';
    mkdir.default.withArgs(`${projectRoot}/.storybook`).resolves(pathToCreatedDirectory);

    assert.deepEqual(
      await scaffold({projectRoot}),
      {
        scripts: {
          start: 'start-storybook --port 8888 --ci',
          'build:storybook': 'build-storybook --quiet'
        },
        eslintConfigs: ['react'],
        dependencies: [
          'react',
          'react-dom',
          'prop-types'
        ],
        devDependencies: [
          '@storybook/react',
          'babel-loader'
        ],
        vcsIgnore: {directories: [`/${storybookBuildDirectory}/`]}
      }
    );
    assert.calledWith(
      promises.copyFile, resolve(__dirname, '..', 'templates', 'storybook-config.js'),
      `${pathToCreatedDirectory}/config.js`
    );
  });
});
