'use strict';

// Euclidean distance
const euclidean_distance = (p,q) => {
  return Math.abs( Math.pow(Math.pow(p.in - q.in, 2) + Math.pow(p.out - q.out, 2), 0.5) );
}

// Calculate the relative percentage between a maximum and a minimum
const as_percentage = (max, min, value) => 100-(((value-min)/(max-min))*100);

// Calculate maximum and minimum of a value in an array of objects
const extremes_values = function(arr, arr_length, key) {
  let max = -Infinity;
  let min = Infinity;
  for (let i=0; i<arr_length; i++) {
    if (arr[i][key] > max) max = Number(arr[i][key]);
    if (arr[i][key] < min) min = Number(arr[i][key]);
  }
  return { max, min };
}

// Measure and print the memory usage
const memory_usage = (prefix) => {
  if (prefix) console.log(prefix);
  const used = process.memoryUsage();
  for (const key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
}

module.exports = {
  euclidean_distance,
  as_percentage,
  extremes_values,
  memory_usage
};