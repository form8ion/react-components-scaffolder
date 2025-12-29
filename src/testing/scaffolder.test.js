import {it, vi, expect, describe} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import scaffoldIntegration from './integration.js';
import scaffold from './scaffolder.js';

vi.mock('./integration.js');

describe('testing scaffolder', () => {
  const projectRoot = any.string();

  it('should not install additional dependencies if the project will not be tested', async () => {
    expect(await scaffold({tests: {}})).toEqual({devDependencies: []});
  });

  it('should install enzyme if the project will be unit tested', async () => {
    expect(await scaffold({tests: {unit: true}})).toEqual({devDependencies: ['enzyme', 'enzyme-adapter-react-16']});
  });

  it('should scaffold cypress if the project will be integration tested', async () => {
    const integrationDevDependencies = any.listOf(any.word);
    const integrationScripts = any.simpleObject();
    const integrationIgnoredDirectories = any.listOf(any.word);
    const integrationIgnoredFiles = any.listOf(any.word);
    const integrationEslintConfigs = any.listOf(any.simpleObject);
    when(scaffoldIntegration)
      .calledWith({projectRoot})
      .thenResolve({
        scripts: integrationScripts,
        devDependencies: integrationDevDependencies,
        vcsIgnore: {directories: integrationIgnoredDirectories, files: integrationIgnoredFiles},
        eslintConfigs: integrationEslintConfigs
      });

    expect(await scaffold({projectRoot, tests: {integration: true}})).toEqual({
      scripts: integrationScripts,
      devDependencies: integrationDevDependencies,
      vcsIgnore: {
        directories: integrationIgnoredDirectories,
        files: integrationIgnoredFiles
      },
      eslintConfigs: integrationEslintConfigs
    });
  });
});
