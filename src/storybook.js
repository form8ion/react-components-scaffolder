import {promises} from 'fs';
import {resolve} from 'path';

import mkdir from '../thirdparty-wrappers/make-dir.js';

export const STORYBOOK_BUILD_DIRECTORY = 'storybook-static';

export default async function ({projectRoot}) {
  const storybookDirectory = await mkdir(`${projectRoot}/.storybook`);

  await promises.copyFile(
    resolve(__dirname, '..', 'templates', 'storybook-config.js'),
    `${storybookDirectory}/main.js`
  );

  return {
    scripts: {
      start: 'start-storybook --port 8888 --ci',
      'build:storybook': 'build-storybook --quiet'
    },
    devDependencies: [
      '@storybook/react',
      'babel-loader',
      'webpack'
    ],
    vcsIgnore: {directories: [`/${STORYBOOK_BUILD_DIRECTORY}/`]}
  };
}
