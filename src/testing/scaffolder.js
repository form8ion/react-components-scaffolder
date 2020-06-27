import deepmerge from 'deepmerge';
import scaffoldIntegration from './integration';

export default async function ({projectRoot, tests}) {
  const integrationResults = tests.integration ? await scaffoldIntegration({projectRoot}) : {};

  return deepmerge(
    {devDependencies: [...tests.unit ? ['enzyme', 'enzyme-adapter-react-16'] : []]},
    integrationResults
  );
}
