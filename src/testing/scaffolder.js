import scaffoldintegration from './integration';

export default async function ({projectRoot, tests}) {
  const integrationResults = tests.integration && await scaffoldintegration({projectRoot});

  return {
    scripts: {...integrationResults && integrationResults.scripts},
    devDependencies: [
      ...tests.unit ? ['enzyme', 'enzyme-adapter-react-16'] : [],
      ...integrationResults ? integrationResults.devDependencies : []
    ],
    vcsIgnore: {
      directories: [...integrationResults ? integrationResults.vcsIgnore.directories : []],
      files: [...integrationResults ? integrationResults.vcsIgnore.files : []]
    },
    eslintConfigs: [...integrationResults ? integrationResults.eslintConfigs : []]
  };
}
