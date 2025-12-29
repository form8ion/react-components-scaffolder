import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';
import mkdir from 'make-dir';

export const STORYBOOK_BUILD_DIRECTORY = 'storybook-static';

export default async function ({projectRoot}) {
  const storybookDirectory = await mkdir(`${projectRoot}/.storybook`);

  await fs.copyFile(
    resolve(__dirname, '..', 'templates', 'storybook-config.js'),
    `${storybookDirectory}/main.js`
  );

  return {
    scripts: {
      start: 'start-storybook --port 8888 --ci',
      'build:storybook': 'build-storybook --quiet'
    },
    dependencies: {
      javascript: {
        development: [
          '@storybook/react',
          'babel-loader',
          'webpack'
        ]
      }
    },
    vcsIgnore: {directories: [`/${STORYBOOK_BUILD_DIRECTORY}/`]}
  };
}
