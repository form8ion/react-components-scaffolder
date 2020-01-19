import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';

export default function ({projectRoot}) {
  return scaffoldCypress({projectRoot, testDirectory: 'test/integration/', testBaseUrl: 'http://localhost:5000'});
}
