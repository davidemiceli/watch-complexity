'use strict';

// Requirements
const types_of_role = require('./roletypes');
const role = require('./role');
const {
  euclidean_distance,
  as_percentage,
  extremes_values
} = require('../../../../libs/helpers');

// Add the index for every object in an array
const compute_score = (item, index, key) => {
  item[key] += index;
  return item;
}

// Edge validation
const validate_edge = edge => {
  if (typeof(edge.weight) !== 'number') throw Error('All "weight" fields into edges should be a number')
  if ((typeof(edge.from) !== 'string') || (typeof(edge.to) !== 'string')) throw Error('All "from" or "to" fields into edges should be a string')
  if (edge.weight === 0) throw Error('"weight" field into edges should not be 0')
}

// Calculate and return in and out degree of every node from a list of edges
const in_out_degree = function(edges) {
  // init map of nodes to enrich by in and out degree
  const nodes = {};
  let num_of_nodes = 0;
  // For every edge of the network
  for (const edge of edges) {
    // Validate every edge
    validate_edge(edge);
    // From
    if (!nodes[edge.from]) {
      nodes[edge.from] = {in: 0, out: 0, inw: 0, outw: 0};
      num_of_nodes += 1;
    }
    nodes[edge.from].out += 1;
    nodes[edge.from].outw += edge.weight;
    nodes[edge.from].nto = String(edge.to);
    // To
    if (!nodes[edge.to]) {
      nodes[edge.to] = {in: 0, out: 0, inw: 0, outw: 0};
      num_of_nodes += 1;
    }
    nodes[edge.to].in += 1;
    nodes[edge.to].inw += edge.weight;
    nodes[edge.to].nfrom = String(edge.from);
  }
  // Return nodes enriched by in and out degree
  return { nodes, num_of_nodes };
}

// Calculate network statistics
const network_statistics = function(nodes, num_of_nodes) {
  const means = {in: 0, out: 0}; // sum in nodes / num nodes
  const maxdegree = {in: -Infinity, out: -Infinity};
  for (const i in nodes) {
    if (nodes[i].in > maxdegree.in) maxdegree.in = Number(nodes[i].in);
    if (nodes[i].out > maxdegree.out) maxdegree.out = Number(nodes[i].out);
    means.in += nodes[i].in;
    means.out += nodes[i].out;
  }
  means.in = means.in / num_of_nodes;
  means.out = means.out / num_of_nodes;
  // if mean < threshold { if mean < num_of_nodes/3 ==> mean = num_of_nodes/3 }
  const potential_mean = num_of_nodes/3;
  const boxmeans = euclidean_distance(means, {in: means.in-(means.in/4), out: means.out-(means.out/4)});
  return { means, potential_mean, maxdegree, boxmeans };
}

// Calculate the role of every node
const detect_roles = (nodes, means, potential_mean, boxmeans, maxdegree) => {
  // The types of influence (Converting an array of roles as object of {"role_name": 0, ...})
  const roletypes = Object.assign(...types_of_role.map(r => ({[r]: 0})));
  // Create an empty node list
  const nodelist = [];
  // Calulate the influence role for every node
  for (const i in nodes) {
    const node = nodes[i];
    // Get the role played by the node
    const noderole = role(nodes, node, means, potential_mean, boxmeans, maxdegree);
    // Increment the general number of roles inside the network
    roletypes[noderole] ? roletypes[noderole] += 1 : roletypes[noderole] = 1;
    // Delete no more used fields
    delete node.nfrom;
    delete node.nto;
    // Define new useful fields
    node.role = noderole;
    node.node = i;
    node.score = 0;
    // Add the node to the list
    nodelist.push(node);
  }
  return { roletypes, nodelist };
}

// Calculate the influence score for ranking by influence
const influence_ranking = function(nodes, num_of_nodes) {
  const key = 'score';
  // Top for indegree
  const scored_nodes = nodes
    .sort((p1, p2) => p2.in - p1.in)
    .map((n, index) => compute_score(n, index, key))
    // Top for outdegree
    .sort((p1, p2) => p2.out - p1.out)
    .map((n, index) => compute_score(n, index, key))
    // Top for indegree weights
    .sort((p1, p2) => p2.inw - p1.inw)
    .map((n, index) => compute_score(n, index, key))
    // Top for outdegree weights
    .sort((p1, p2) => p2.outw - p1.outw)
    .map((n, index) => compute_score(n, index, key));
  
  // Calculate score extremes
  const { max, min } = extremes_values(nodes, num_of_nodes, 'score');

  // Make influence score
  return scored_nodes
    .sort((p1, p2) => p1.score - p2.score)
    .map(n => ({
      node: n.node,
      role: n.role,
      score: as_percentage(max, min, n.score)
    }));
}

module.exports = {
  in_out_degree,
  network_statistics,
  detect_roles,
  influence_ranking
};
