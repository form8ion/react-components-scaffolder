import scaffoldStorybook from './storybook';

export default async function ({projectRoot}) {
  const storybookResults = await scaffoldStorybook({projectRoot});

  return {
    scripts: storybookResults.scripts,
    eslintConfigs: ['react'],
    dependencies: [
      'react',
      'react-dom',
      'prop-types'
    ],
    devDependencies: [
      'enzyme',
      'enzyme-adapter-react-16',
      ...storybookResults.devDependencies
    ],
    vcsIgnore: {directories: storybookResults.vcsIgnore.directories, files: []}
  };
}
