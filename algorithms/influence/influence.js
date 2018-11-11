'use strict';

// Requirements
const {
  in_out_degree,
  network_statistics,
  detect_roles,
  influence_ranking
} = require('./components/influence');

const { memory_usage } = require('../../libs/helpers');

// Calculate the influence of nodes from a list of edges
function influence(edges) {
  // Get the number of edges
  const num_of_edges = edges.length;
  if (num_of_edges < 20) throw Error('Too few edges');
  // Calculate in and out degree for every node
  const { nodes, num_of_nodes } = in_out_degree(edges);
  if (num_of_nodes < 20) throw Error('Too few nodes');
  // Calculate network measurements necessary for influence role detection
  const { means, potential_mean, maxdegree, boxmeans } = network_statistics(nodes, num_of_nodes);
  // Calulate for every node its influence role
  const { roletypes, nodelist } = detect_roles(nodes, means, potential_mean, boxmeans, maxdegree);
  // Calculate the influence score
  const ranked_nodes = influence_ranking(nodelist, num_of_nodes);

  // Return data result
  return {
    ranking: ranked_nodes,
    nodes: num_of_nodes,
    edges: num_of_edges,
    // means: {in: means.in, out: means.out, maxin: maxdegree.in, maxout: maxdegree.out},
    distribution: roletypes
  };
}

module.exports = influence;
