import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';
import mkdir from 'make-dir';

import {it, vi, expect, describe} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import scaffold from './storybook.js';

vi.mock('node:fs');
vi.mock('make-dir');

describe('storybook scaffolder', () => {
  it('should scaffold storybook', async () => {
    const projectRoot = any.string();
    const storybookBuildDirectory = 'storybook-static';
    const pathToCreatedDirectory = any.string();
    when(mkdir).calledWith(`${projectRoot}/.storybook`).thenResolve(pathToCreatedDirectory);

    expect(await scaffold({projectRoot})).toEqual({
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
    });
    expect(fs.copyFile).toHaveBeenCalledWith(
      resolve(__dirname, '..', 'templates', 'storybook-config.js'),
      `${pathToCreatedDirectory}/main.js`
    );
  });
});
