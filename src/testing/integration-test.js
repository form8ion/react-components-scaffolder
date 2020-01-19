import * as cypressScaffolder from '@form8ion/cypress-scaffolder';
import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
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
    cypressScaffolder.scaffold
      .withArgs({projectRoot, testDirectory: 'test/integration/', testBaseUrl: 'http://localhost:5000'})
      .resolves(cypressResults);

    assert.equal(await scaffold({projectRoot}), cypressResults);
  });
});
