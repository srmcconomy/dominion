import * as tests from './';
import { suite } from '../../testingFramework';

delete tests.Index;

suite('Guilds', () => {
  Object.keys(tests).forEach(testName => {
    suite(testName, tests[testName]);
  });
});
