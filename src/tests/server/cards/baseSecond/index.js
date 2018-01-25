import * as tests from './';
import { suite } from '../../testingFramework';

delete tests.Index;

suite('Base Second Edition', () => {
  Object.keys(tests).forEach(testName => {
    suite(testName, tests[testName]);
  });
});
