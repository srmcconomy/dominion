import chalk from 'chalk';

let suites = [];
let tests;
let beforeEachFunc;
let results;
let indent = '';

export const log = console.log;
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
        message: pass ? '' : `Expected ${val1} to equal ${val2}`,
      });
    }
  };
}

async function runSuite(currentSuite, regex) {
  let currentLog = '';
  let suitePass = true;
  if (currentSuite.name.match(regex)) {
    const suiteResults = [];
    for (const { testName, testFunc } of currentSuite.tests) {
      let testPass = true;
      results = [];
      await currentSuite.beforeEachFunc();
      try {
        await testFunc();
        if (results.some(({ pass }) => !pass)) {
          testPass = false;
          suitePass = false;
        }
        suiteResults.push({ testName, testPass, results });
      } catch (err) {
        suitePass = false;
        suiteResults.push({ testName, testPass: false, results: [{ pass: false, message: `error occurred: ${err.stack}` }] });
      }
    }
    suiteResults.forEach(({ testName, testPass, results: res }) => {
      currentLog += `${indent}  ${testPass ? chalk.green('🗸') : chalk.red('✕')} ${testName}\n`;
      if (!testPass) {
        res.forEach(({ pass, message }) => {
          if (!pass) {
            currentLog += `${indent}      ${chalk.red(message)}\n`;
          }
        });
      }
    });
    indent = `${indent}  `;
    for (const subSuite of currentSuite.suites) {
      const { pass, log: subLog } = await runSuite(subSuite, /./);
      currentLog += subLog;
      suitePass = suitePass && pass;
    }
    indent = indent.substr(2);
  } else {
    indent = `${indent}  `;
    for (const subSuite of currentSuite.suites) {
      const { pass, log: subLog } = await runSuite(subSuite, regex);
      currentLog += subLog;
      suitePass = suitePass && pass;
    }
    indent = indent.substr(2);
  }
  if (currentLog) {
    currentLog = `${indent}${suitePass ? chalk.bgGreen.bold(' PASS ') : chalk.bgRed.bold(' FAIL ')} ${currentSuite.name}\n${currentLog}`;
  }
  return { pass: suitePass, log: currentLog };
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
  for (const currentSuite of allSuites) {
    log((await runSuite(currentSuite, regex)).log);
  }
  log();
}
