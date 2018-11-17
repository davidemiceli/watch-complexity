'use strict';

// Generate score intervals with relative expected results
const random_interval = (from, to, value) => {
  const incr = 0.05;
  const max = to - incr;
  let score = from - incr;
  const tester = [];
  while (score < max) {
    score += incr;
    tester.push({score: Number(score), expected: String(value)});
  }
  return tester;
}

module.exports = {
  random_interval
};
