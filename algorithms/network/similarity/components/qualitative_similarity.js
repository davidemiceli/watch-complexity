'use strict';

// Return a qualitative interpretation
module.exports = (d) => {
  switch(true) {
    case d === 1: return 'strongly similar';
    case ((d >= 0.9) && (d < 1)): return 'very similar';
    case ((d >= 0.8) && (d < 0.9)): return 'similar';
    case ((d >= 0.6) && (d < 0.8)): return 'a little similar';
    case ((d >= 0.4) && (d < 0.6)): return 'very low similar';
    case ((d >= 0.2) && (d < 0.4)): return 'different';
    case ((d >= 0) && (d < 0.2)): return 'totally different';
    default: throw Error('Invalid similarity score: out of range 0-1');
  }
}
