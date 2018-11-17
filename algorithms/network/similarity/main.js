'use strict';

// Requirements
const typologies = require('../../influence/typology/components/roletypes');
const normalized_distance = require('./components/normalized_distance');
const qualitative_similarity = require('./components/qualitative_similarity');


// Check if exists the edge field
const validate = (e) => {
  if (!e.edges) throw Error('0 or missing number of edges ("edge" field).');
}

module.exports = (subject, networks) => {
  // Check if edges field exists
  validate(subject);
  typologies.push('edges');
  // Extract the vector of typologies from subject
  const vector_a = typologies.map(t => subject[t] || 0);
  // Return results for every network according to subject
  return networks.map(n => {
    // Check if edges field exists
    validate(n);
    // Extract the vector of typologies from the network
    const vector_b = typologies.map(t => n[t] || 0);
    // Calculate the distance between subject and the network
    const d = normalized_distance(vector_a, vector_b);
    // Calculate inverse of the distance
    const inverse = 1 - d;
    // Get the qualitative outcome
    const esit = qualitative_similarity(inverse);
    return {
      score: inverse,
      value: esit
    };
  });
}