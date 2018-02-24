import 'source-map-support/register';

import { runTests } from './testingFramework';

import './cards/base';
import './cards/baseSecond';
import './cards/adventures';
import './cards/cornucopia';
import './cards/intrigue';
import './cards/guilds';

if (process.argv[3]) {
  runTests(new RegExp(process.argv[3].substr(2), 'i'));
} else {
  runTests(/./);
}
