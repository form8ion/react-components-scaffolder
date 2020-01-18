export default function ({tests}) {
  return {devDependencies: [...tests.unit ? ['enzyme', 'enzyme-adapter-react-16'] : []]};
}
