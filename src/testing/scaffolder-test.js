import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as integrationScaffolder from './integration';
import scaffold from '.';

suite('testing', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(integrationScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that no additional dependencies are installed if the project will not be tested', async () => {
    assert.deepEqual(await scaffold({tests: {}}), {devDependencies: []});
  });

  test('that enzyme gets installed if the project will be unit tested', async () => {
    assert.deepEqual(await scaffold({tests: {unit: true}}), {devDependencies: ['enzyme', 'enzyme-adapter-react-16']});
  });

  test('that cypress is scaffolded if the project will be integration tested', async () => {
    const integrationDevDependencies = any.listOf(any.word);
    const integrationScripts = any.simpleObject();
    const integrationIgnoredDirectories = any.listOf(any.word);
    const integrationIgnoredFiles = any.listOf(any.word);
    const integrationEslintConfigs = any.listOf(any.simpleObject);
    integrationScaffolder.default
      .withArgs({projectRoot})
      .resolves({
        scripts: integrationScripts,
        devDependencies: integrationDevDependencies,
        vcsIgnore: {directories: integrationIgnoredDirectories, files: integrationIgnoredFiles},
        eslintConfigs: integrationEslintConfigs
      });

    assert.deepEqual(
      await scaffold({projectRoot, tests: {integration: true}}),
      {
        scripts: integrationScripts,
        devDependencies: integrationDevDependencies,
        vcsIgnore: {directories: integrationIgnoredDirectories, files: integrationIgnoredFiles},
        eslintConfigs: integrationEslintConfigs
      }
    );
  });
});
