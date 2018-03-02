import 'source-map-support/register';

import { runTests } from './testingFramework';

import './cards/basic';
import './cards/base';
import './cards/baseSecond';
import './cards/adventures';
import './cards/cornucopia';
import './cards/intrigue';
import './cards/seaside';
import './cards/guilds';
import './cards/darkAges';
import './cards/nocturn';

if (process.argv[3]) {
  runTests(new RegExp(process.argv[3].substr(2), 'i'));
} else {
  runTests(/./);
}
