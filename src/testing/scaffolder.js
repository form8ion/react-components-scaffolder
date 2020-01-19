import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';

export default async function ({projectRoot, tests}) {
  const cypressResults = tests.integration
    && await scaffoldCypress({projectRoot, testDirectory: 'test/integration/', testBaseUrl: 'http://localhost:5000'});

  return {
    scripts: {...cypressResults && cypressResults.scripts},
    devDependencies: [
      ...tests.unit ? ['enzyme', 'enzyme-adapter-react-16'] : [],
      ...cypressResults ? cypressResults.devDependencies : []
    ],
    vcsIgnore: {
      directories: [...cypressResults ? cypressResults.vcsIgnore.directories : []],
      files: [...cypressResults ? cypressResults.vcsIgnore.files : []]
    },
    eslintConfigs: [...cypressResults ? cypressResults.eslintConfigs : []]
  };
}
