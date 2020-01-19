import * as cypressScaffolder from '@form8ion/cypress-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import scaffold from './testing';

suite('testing', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(cypressScaffolder, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that no additional dependencies are installed if the project will not be tested', async () => {
    assert.deepEqual(
      await scaffold({tests: {}}),
      {scripts: {}, devDependencies: [], vcsIgnore: {files: [], directories: []}, eslintConfigs: []}
    );
  });

  test('that enzyme gets installed if the project will be unit tested', async () => {
    assert.deepEqual(
      await scaffold({tests: {unit: true}}),
      {
        scripts: {},
        devDependencies: ['enzyme', 'enzyme-adapter-react-16'],
        vcsIgnore: {files: [], directories: []},
        eslintConfigs: []
      }
    );
  });

  test('that cypress is scaffolded if the project will be integration tested', async () => {
    const cypressDevDependencies = any.listOf(any.word);
    const cypressScripts = any.simpleObject();
    const cypressIgnoredDirectories = any.listOf(any.word);
    const cypressIgnoredFiles = any.listOf(any.word);
    const cypressEslintConfigs = any.listOf(any.simpleObject);
    cypressScaffolder.scaffold
      .withArgs({projectRoot, testDirectory: 'test/integration/', testBaseUrl: 'http://localhost:5000'})
      .resolves({
        scripts: cypressScripts,
        devDependencies: cypressDevDependencies,
        vcsIgnore: {directories: cypressIgnoredDirectories, files: cypressIgnoredFiles},
        eslintConfigs: cypressEslintConfigs
      });

    assert.deepEqual(
      await scaffold({projectRoot, tests: {integration: true}}),
      {
        scripts: cypressScripts,
        devDependencies: cypressDevDependencies,
        vcsIgnore: {directories: cypressIgnoredDirectories, files: cypressIgnoredFiles},
        eslintConfigs: cypressEslintConfigs
      }
    );
  });
});
