import 'source-map-support/register';

import { runTests } from './testingFramework';

import './cards/base';
import './cards/baseSecond';
import './cards/adventures';
import './cards/intrigue';

if (process.argv[3]) {
  runTests(new RegExp(process.argv[3].substr(2), 'i'));
} else {
  runTests(/./);
}
