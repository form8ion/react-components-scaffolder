import {assert} from 'chai';
import scaffold from './testing';

suite('testing', () => {
  test('that no additional dependencies are installed if the project will not be tested', async () => {
    assert.deepEqual(await scaffold({tests: {}}), {devDependencies: []});
  });

  test('that enzyme gets installed if the project will be unit tested', async () => {
    assert.deepEqual(
      await scaffold({tests: {unit: true}}),
      {devDependencies: ['enzyme', 'enzyme-adapter-react-16']}
    );
  });
});
