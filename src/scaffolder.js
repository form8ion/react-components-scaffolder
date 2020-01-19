import scaffoldTesting from './testing';
import scaffoldStorybook from './storybook';

export default async function ({projectRoot, tests}) {
  const [testingResults, storybookResults] = await Promise.all([
    scaffoldTesting({projectRoot, tests}),
    scaffoldStorybook({projectRoot})
  ]);

  return {
    scripts: {
      ...storybookResults.scripts,
      ...testingResults.scripts
    },
    eslintConfigs: ['react', ...testingResults.eslintConfigs],
    dependencies: [
      'react',
      'react-dom',
      'prop-types'
    ],
    devDependencies: [
      ...testingResults.devDependencies,
      ...storybookResults.devDependencies
    ],
    vcsIgnore: {
      directories: [...testingResults.vcsIgnore.directories, ...storybookResults.vcsIgnore.directories],
      files: [...testingResults.vcsIgnore.files, ...storybookResults.vcsIgnore.files]
    }
  };
}
