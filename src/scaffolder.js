import scaffoldTesting from './testing';
import scaffoldStorybook from './storybook';

export default async function ({projectRoot, tests}) {
  const [testingResults, storybookResults] = await Promise.all([
    scaffoldTesting({tests}),
    scaffoldStorybook({projectRoot})
  ]);

  return {
    scripts: storybookResults.scripts,
    eslintConfigs: ['react'],
    dependencies: [
      'react',
      'react-dom',
      'prop-types'
    ],
    devDependencies: [
      ...testingResults.devDependencies,
      ...storybookResults.devDependencies
    ],
    vcsIgnore: {directories: storybookResults.vcsIgnore.directories, files: []}
  };
}
