'use strict';

// Requirements
const expect = require('chai').expect;
const watchcomplexity = require('../../../index');
const { sum } = require('../../../libs/helpers');
const { random_interval } = require('./helpers');
const mocks = {
  networks: require('./mocks/networks')
};
const normalized_distance = require('../../../algorithms/network/similarity/components/normalized_distance');
const qualitative_similarity = require('../../../algorithms/network/similarity/components/qualitative_similarity');

describe('Network Similarity', () => {

  describe('Components', () => {

    it('calculate the normalized distance between two vectors', () => {
      // Compare with the right distance
      const a = [56, 61, 3, 0, 95, 27, 21, 17, 33, 19, 43, 52, 37, 64, 13];
      const b = [89, 60, 87, 40, 57, 2, 31, 74, 0, 62, 12, 78, 71, 34, 88];
      const d = normalized_distance(a, b);
      expect(d).to.equal(0.4107926710512517);
      // Compare with a fake distance
      const sum_a = a.reduce(sum, 0);
      const sum_b = b.reduce(sum, 0);
      const fake_distance = Math.abs(sum_a - sum_b);
      expect(d).to.not.equals(fake_distance);
    });

    it('calculate the qualitative similarity given a score', () => {
      // Submit values in right range
      new Array(
        {score: 1, expected: 'strongly similar'},
        ...random_interval(0.9, 1, 'very similar'),
        ...random_interval(0.8, 0.9, 'similar'),
        ...random_interval(0.6, 0.8, 'a little similar'),
        ...random_interval(0.4, 0.6, 'very low similar'),
        ...random_interval(0.2, 0.4, 'different'),
        ...random_interval(0, 0.2, 'totally different')
      ).map(t => {
        const { score, expected } = Object.assign({}, t);
        const s = qualitative_similarity(score);
        expect(s).to.be.a('string').to.equals(expected);
      });
      // Submit a non normalized score
      expect(() => qualitative_similarity(1234)).to.throw(
        'Invalid similarity score: out of range 0-1'
      );
    });

  });

  describe('Algorithm', () => {

    it('measures similarity between networks', () => {
      const networks = mocks.networks;
      const subject = networks.shift();
      const res = watchcomplexity.network.similarity(subject, networks);
      const expected = [
        {value: "strongly similar", score: 1},
        {value: "very similar", score: 0.9999067685996643},
        {value: "totally different", score: 0},
        {value: "very low similar", score: 0.4961592033161797}
      ];
      expect(res).to.deep.equal(expected);
      const errmsg = '0 or missing number of edges ("edge" field).';
      const checker = () => watchcomplexity.network.similarity(subject, networks);
      delete networks[2].edges;
      expect(checker).to.throw(errmsg)
      delete subject.edges;
      expect(checker).to.throw(errmsg)
    });

  });

});