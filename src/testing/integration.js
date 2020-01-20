import deepmerge from 'deepmerge';
import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';
import {STORYBOOK_BUILD_DIRECTORY} from '../storybook';

export default async function ({projectRoot}) {
  const baseUrl = 'http://localhost:5000';

  return deepmerge(
    {
      scripts: {
        preserve: 'run-s build:storybook',
        serve: `serve ${STORYBOOK_BUILD_DIRECTORY}/`,
        'test:integration': `start-server-and-test 'npm run serve' ${baseUrl} cypress:run`
      },
      devDependencies: ['serve', 'start-server-and-test']
    },
    await scaffoldCypress({projectRoot, testDirectory: 'test/integration/', testBaseUrl: baseUrl})
  );
}
