'use strict';

// Requirements
const { euclidean_distance } = require('../../../../libs/helpers');


// Get the influence role of a node
module.exports = (nodes, pnt, means, potential_mean, boxmeans, maxdegree) => {
  // Compared to potential reach (it is static and predefined only based on number of nodes)
  // (To avoid issues with sconnected graphs where max out and max in are very small compared to total number of nodes)
  if ((pnt.in >= potential_mean) && (pnt.out == 0)) {
    return 'Blackhole';
  }
  if ((pnt.in == 0) && (pnt.out >= potential_mean)) {
    return 'Vulcano';
  }

  if ((pnt.in === 1) && (pnt.out === 1)) {
    if (nodes[pnt.nfrom].in > 1 && nodes[pnt.nfrom].out === 1 && nodes[pnt.nto].in === 1 && nodes[pnt.nto].out === 1) {
      return "Channeler";
    } else if (nodes[pnt.nfrom].in === 1 && nodes[pnt.nfrom].out === 1 && nodes[pnt.nto].in === 1 && nodes[pnt.nto].out === 1) {
      return "Chain";
    } else if ( (nodes[pnt.nfrom].in > means.in) && (nodes[pnt.nfrom].out > means.out) && (nodes[pnt.nto].in > means.in) && (nodes[pnt.nto].out > means.out) ) {
      return "Bridge";
    } else {
      return "Connector";
    }
  }
  if ((pnt.in === 0) && (pnt.out === 1)) {
    return 'Emitter branch';
  }
  if ((pnt.in === 1) && (pnt.out === 0)) {
    return 'Receiver branch';
  }

  // Compared to averange degree (it is relative)
  if ((pnt.in > means.in) && (pnt.out == 0)) {
    return 'Receiver';
  }
  if ((pnt.in == 0) && (pnt.out > means.out)) {
    return 'Emitter';
  }
  if ((pnt.in == 0) && (pnt.out < means.out)) {
    return 'Low emitter';
  }
  if ((pnt.in < means.in) && (pnt.out == 0)) {
    return 'Idle';
  }

  const d_from_mean = euclidean_distance(pnt, means);
  if (d_from_mean <= boxmeans) {
    return 'Transceiver'; /*
    if ( (pnt.in < pnt.out+(pnt.out/6)) && (pnt.in > pnt.out-(pnt.out/6)) ) {
      return 'Transceiver';
    } else {
      return 'Connector';
    } */
  } else {
    if ( (pnt.in < pnt.out+(pnt.out/6)) && (pnt.in > pnt.out-(pnt.out/6)) ) {
      if ((pnt.in == maxdegree.in) && (pnt.out == maxdegree.out)) {
        return 'Tophub';
      } else if ((pnt.in >= means.in) && (pnt.out >= means.out)) {
        return 'Hub';
      } else if ((pnt.in < means.in) && (pnt.out < means.out)) {
        return 'Transceiver'; // Regulator; //'Retriever'; //return 'Branch'; Bridge, Repeater, Retriever = get and resend
      } else {
        return 'Hub';
      }
    } else if (pnt.in > pnt.out) {
      if ((pnt.in >= means.in) && (pnt.in > (pnt.out*3))) {
        return 'Dam'; // Gatherer, Selector, reducer, dam (diga)
      } else {
        return 'Reducer'; // Small reducer, small funnel
      }
    } else if (pnt.in < pnt.out) {
      if ((pnt.out >= means.out) && (pnt.out > (pnt.in*3))) {
        return 'Megamplifier'; //eturn 'Broadcaster';
      } else {
        return 'Amplifier';
      }
    }
  }
}
