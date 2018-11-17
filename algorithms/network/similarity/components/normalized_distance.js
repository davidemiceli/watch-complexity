'use strict';

// Return the normalized distance
module.exports = (a, b) => {
  let sum = 0, sum_of_max = 0;
  for (let i=0; i<a.length; i++) {
    const x = a[i];
    const y = b[i];
    sum_of_max += Math.pow(Math.max(x, y), 2);
    sum += Math.pow(x - y, 2);
  }
  return sum / sum_of_max;
}
