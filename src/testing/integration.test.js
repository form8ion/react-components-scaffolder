import deepmerge from 'deepmerge';
import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';

import {it, describe, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {STORYBOOK_BUILD_DIRECTORY} from '../storybook.js';
import scaffold from './integration.js';

vi.mock('@form8ion/cypress-scaffolder');

describe('integration', () => {
  const projectRoot = any.string();

  it('should scaffold cypress', async () => {
    const cypressResults = any.simpleObject();
    const baseUrl = 'http://localhost:5000';
    when(scaffoldCypress)
      .calledWith({projectRoot, testDirectory: 'test/integration/', testBaseUrl: baseUrl})
      .thenResolve(cypressResults);

    expect(await scaffold({projectRoot})).toEqual(deepmerge(
      cypressResults,
      {
        scripts: {
          preserve: 'run-s build:storybook',
          serve: `serve ${STORYBOOK_BUILD_DIRECTORY}/`,
          'test:integration': `start-server-and-test 'npm run serve' ${baseUrl} cypress:run`
        },
        dependencies: {javascript: {development: ['serve', 'start-server-and-test']}}
      }
    ));
  });
});
