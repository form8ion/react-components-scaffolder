import {promises, promises as fsPromises} from 'fs';
import {resolve} from 'path';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as mkdir from '../thirdparty-wrappers/make-dir';
import scaffold from './storybook';

suite('storybook', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(mkdir, 'default');
    sandbox.stub(fsPromises, 'copyFile');
  });

  teardown(() => sandbox.restore());

  test('that storybook gets scaffolded', async () => {
    const projectRoot = any.string();
    const storybookBuildDirectory = 'storybook-static';
    const pathToCreatedDirectory = any.string();
    mkdir.default.withArgs(`${projectRoot}/.storybook`).resolves(pathToCreatedDirectory);

    assert.deepEqual(
      await scaffold({projectRoot}),
      {
        scripts: {
          start: 'start-storybook --port 8888 --ci',
          'build:storybook': 'build-storybook --quiet'
        },
        devDependencies: [
          '@storybook/react',
          'babel-loader',
          'webpack'
        ],
        vcsIgnore: {directories: [`/${storybookBuildDirectory}/`]}
      }
    );
    assert.calledWith(
      promises.copyFile,
      resolve(__dirname, '..', 'templates', 'storybook-config.js'),
      `${pathToCreatedDirectory}/main.js`
    );
  });
});
