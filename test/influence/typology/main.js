'use strict';

// Requirements
const expect = require('chai').expect;
const watchcomplexity = require('../../../index');
const mocks = {
  edges: require('./mocks/influence/edges'),
  nodes: require('./mocks/influence/nodes'),
  roletypes: require('./mocks/influence/roletypes'),
  nodelist: require('./mocks/influence/nodelist'),
  ranked_nodes: require('./mocks/influence/ranked_nodes')
};
const {
  in_out_degree,
  network_statistics,
  detect_roles,
  influence_ranking
} = require('../../../algorithms/influence/typology/components/libs');


describe('Ranked Influence Typology', () => {

  describe('Components', () => {

    it('calculate in degree and out degree', () => {
      const edges = mocks.edges;
      const { nodes, num_of_nodes } = in_out_degree(edges);
      expect(nodes).to.be.an('object');
      for (const n in nodes) {
        const node = nodes[n];
        ['in', 'out', 'inw','outw'].map(prop => expect(node).to.have.property(prop).to.be.a('number'));
      }
      expect(num_of_nodes).to.equal(77);
    });

    it('calculate network statistics', () => {
      const nodes = mocks.nodes;
      const num_of_nodes = Object.keys(nodes).length;
      const { means, potential_mean, maxdegree, boxmeans } = network_statistics(nodes, num_of_nodes);
      expect(means).to.deep.equal({in: 3.2987012987012987, out: 3.2987012987012987});
      expect(potential_mean).to.equal(25.666666666666668);
      expect(maxdegree).to.deep.equal({ in: 32, out: 10 });
      expect(boxmeans).to.equal(1.16626702871028);
    });

    it('detect the influence roles of nodes', () => {
      const nodes = mocks.nodes;
      const roletypes = mocks.roletypes;
      const nodelist = mocks.nodelist;
      const means = {in: 3.2987012987012987, out: 3.2987012987012987};
      const potential_mean = 25.666666666666668;
      const maxdegree = {in: 32, out: 10};
      const boxmeans = 1.16626702871028;
      const res = detect_roles(nodes, means, potential_mean, boxmeans, maxdegree);
      expect(res.roletypes).to.deep.equal(roletypes);
      expect(res.nodelist).to.have.deep.members(nodelist);
    });

    it('return the nodes ranked by influence with their roles', () => {
      const nodelist = mocks.nodelist;
      const num_of_nodes = nodelist.length;
      const ranked_nodes = mocks.ranked_nodes;
      const res = influence_ranking(nodelist, num_of_nodes);
      expect(res).to.have.deep.members(ranked_nodes);
    });

  });

  describe('Algorithm', () => {

    it('rank nodes by influence with their roles', () => {
      const edges = mocks.edges;
      const res = watchcomplexity.influence.typology(edges);
      expect(res).to.deep.equal({
        ranking: mocks.ranked_nodes,
        nodes: 77,
        edges: 254,
        distribution: mocks.roletypes
      });
    });

  });

});