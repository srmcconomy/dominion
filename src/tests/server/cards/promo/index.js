import * as tests from './';
import { suite } from '../../testingFramework';

delete tests.Index;

suite('Promo', () => {
  Object.keys(tests).forEach(testName => {
    suite(testName, tests[testName]);
  });
});
