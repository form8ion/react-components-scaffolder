import cypressScaffolder from '@form8ion/cypress-scaffolder';
import deepmerge from 'deepmerge';
import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import {STORYBOOK_BUILD_DIRECTORY} from '../storybook';
import scaffold from './integration';

suite('integration', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(cypressScaffolder, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that cypress is scaffolded', async () => {
    const cypressResults = any.simpleObject();
    const baseUrl = 'http://localhost:5000';
    cypressScaffolder.scaffold
      .withArgs({projectRoot, testDirectory: 'test/integration/', testBaseUrl: baseUrl})
      .resolves(cypressResults);

    assert.deepEqual(
      await scaffold({projectRoot}),
      deepmerge(
        cypressResults,
        {
          scripts: {
            preserve: 'run-s build:storybook',
            serve: `serve ${STORYBOOK_BUILD_DIRECTORY}/`,
            'test:integration': `start-server-and-test 'npm run serve' ${baseUrl} cypress:run`
          },
          devDependencies: ['serve', 'start-server-and-test']
        }
      )
    );
  });
});
