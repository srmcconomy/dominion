import * as tests from './';
import { suite } from '../../testingFramework';

delete tests.Index;

suite('Alchemy', () => {
  Object.keys(tests).forEach(testName => {
    suite(testName, tests[testName]);
  });
});
