import deepmerge from 'deepmerge';
import scaffoldintegration from './integration';

export default async function ({projectRoot, tests}) {
  const integrationResults = tests.integration ? await scaffoldintegration({projectRoot}) : {};

  return deepmerge(
    {devDependencies: [...tests.unit ? ['enzyme', 'enzyme-adapter-react-16'] : []]},
    integrationResults
  );
}
