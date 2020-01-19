import deepmerge from 'deepmerge';
import scaffoldTesting from './testing';
import scaffoldStorybook from './storybook';

export default async function ({projectRoot, tests}) {
  const [testingResults, storybookResults] = await Promise.all([
    scaffoldTesting({projectRoot, tests}),
    scaffoldStorybook({projectRoot})
  ]);

  return deepmerge.all([
    {
      dependencies: ['react', 'react-dom', 'prop-types'],
      eslintConfigs: ['react']
    },
    testingResults,
    storybookResults
  ]);
}
