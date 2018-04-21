import chalk from 'chalk';

let suites = [];
let tests;
let beforeEachFunc;
let results;
let indent = '';

export const log = console.log;
process.log = log;
console.log = () => {};

export function suite(suiteName, suiteFunc) {
  suites.push({ suiteName, suiteFunc });
}

export function test(testName, testFunc) {
  tests.push({ testName, testFunc });
}

export function beforeEach(func) {
  beforeEachFunc = func;
}

export function expect(val1) {
  return {
    toBe(val2) {
      const pass = val1 === val2;
      results.push({
        pass,
        message: pass ? '' : `Expected ${val2} but got ${val1}`,
      });
    },

    toNotBe(val2) {
      const pass = val1 !== val2;
      results.push({
        pass,
        message: pass ? '' : `Did not expect ${val1}`,
      });
    },

    toInclude(val2) {
      const pass = val1 && val1.includes && val1.includes(val2);
      results.push({
        pass,
        message: pass ? '' : `Expected ${val1} to include ${val2}`,
      });
    },

    toHave(val2) {
      const pass = val1 && val1.has && val1.has(val2);
      results.push({
        pass,
        message: pass ? '' : `Expected ${val1} to have ${val2}`,
      });
    },

    toHaveSome(pred) {
      const pass = val1 && val1.some && val1.some(pred);
      results.push({
        pass,
        message: pass ? '' : `Expected ${val1.toString()} to have an element where ${pred.toString()}`,
      });
    },

    toNotHaveSome(pred) {
      const pass = val1 && val1.some && !val1.some(pred);
      results.push({
        pass,
        message: pass ? '' : `Expected ${val1.toString()} to not have an element where ${pred.toString()}`,
      });
    },
  };
}

async function runSuite(currentSuite, regex) {
  let currentLog = '';
  let suitePass = true;
  const testResults = { pass: 0, fail: 0, pending: 0 };
  if (currentSuite.name.match(regex)) {
    const suiteResults = [];
    for (const { testName, testFunc } of currentSuite.tests) {
      if (!testFunc) {
        suiteResults.push({ testName, testPass: 'pending', results: [] });
      } else {
        let testPass = true;
        results = [];
        await currentSuite.beforeEachFunc();
        try {
          await testFunc();
          if (results.some(({ pass }) => !pass)) {
            testPass = false;
            suitePass = false;
          }
          suiteResults.push({ testName, testPass: testPass ? 'pass' : 'fail', results });
        } catch (err) {
          suitePass = false;
          suiteResults.push({ testName, testPass: 'fail', results: [{ pass: false, message: err.stack }] });
        }
      }
    }
    suiteResults.forEach(({ testName, testPass, results: res }) => {
      switch (testPass) {
        case 'pass':
          testResults.pass++;
          currentLog += `${indent}  ${chalk.green('🗸')} ${testName}\n`;
          break;
        case 'fail':
          testResults.fail++;
          currentLog += `${indent}  ${chalk.red('✕')} ${testName}\n`;
          res.forEach(({ pass, message }) => {
            if (!pass) {
              currentLog += `${indent}      ${chalk.red(message)}\n`;
            }
          });
          break;
        case 'pending':
          testResults.pending++;
          currentLog += `${indent}  ${chalk.blue('?')} ${testName}\n`;
          break;
      }
    });
    indent = `${indent}  `;
    for (const subSuite of currentSuite.suites) {
      const { pass, log: subLog, counts } = await runSuite(subSuite, /./);
      currentLog += subLog;
      suitePass = suitePass && pass;
      testResults.pass += counts.pass;
      testResults.fail += counts.fail;
      testResults.pending += counts.pending;
    }
    indent = indent.substr(2);
  } else {
    indent = `${indent}  `;
    for (const subSuite of currentSuite.suites) {
      const { pass, log: subLog, counts } = await runSuite(subSuite, regex);
      currentLog += subLog;
      suitePass = suitePass && pass;
      testResults.pass += counts.pass;
      testResults.fail += counts.fail;
      testResults.pending += counts.pending;
    }
    indent = indent.substr(2);
  }
  if (currentLog) {
    currentLog = `${indent}${suitePass ? chalk.bgGreen.bold(' PASS ') : chalk.bgRed.bold(' FAIL ')} ${currentSuite.name}\n${currentLog}`;
  }
  return { pass: suitePass, log: currentLog, counts: testResults };
}

class Suite {
  name;
  suites = [];
  tests = [];
  beforeEachFunc = () => {};
  constructor(name) {
    this.name = name;
  }
}

function buildSuites(outerSuites, outerBeforeEachFunc) {
  return outerSuites.map(({ suiteName, suiteFunc }) => {
    const currentSuite = new Suite(suiteName);
    suites = [];
    tests = [];
    beforeEachFunc = () => {};
    suiteFunc();
    const currentBeforeEachFunc = beforeEachFunc;
    const newBeforeEachFunc = async () => {
      await outerBeforeEachFunc();
      await currentBeforeEachFunc();
    };
    currentSuite.beforeEachFunc = newBeforeEachFunc;
    currentSuite.tests = tests;
    if (suites) {
      currentSuite.suites = buildSuites(suites, newBeforeEachFunc);
    }
    return currentSuite;
  });
}

export async function runTests(regex) {
  log();
  const allSuites = buildSuites(suites, () => {});
  const testResults = { pass: 0, fail: 0, pending: 0 };
  for (const currentSuite of allSuites) {
    const result = (await runSuite(currentSuite, regex));
    testResults.pass += result.counts.pass;
    testResults.fail += result.counts.fail;
    testResults.pending += result.counts.pending;
    log(result.log);
  }
  log(`${indent}${testResults.fail === 0 ? chalk.bgGreen.bold(' PASS ') : chalk.bgRed.bold(' FAIL ')} ${testResults.pass} tests pass out of ${testResults.pass + testResults.fail}. ${testResults.pending} pending tests`);
  log();
}
