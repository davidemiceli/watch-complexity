# Watch Complexity  &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/davidemiceli/watch-complexity/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/davidemiceli/watch-complexity/pulls)

WatchComplexity is a package to understand and analyze complex networks and more in general complex data. It is a collection of _**clustering techniques**_ inspired by social science and communication theories.

## Documentation

All useful informations can be found in the wiki documentation:
- [**Introduction**](https://github.com/davidemiceli/watch-complexity/wiki)
- [**Installation**](https://github.com/davidemiceli/watch-complexity/wiki/Installation)
- [**Algorithms**](https://github.com/davidemiceli/watch-complexity/wiki/algorithms)
- [**Testing**](https://github.com/davidemiceli/watch-complexity/wiki/testing)

## Algorithms
The tool provides the following algorithms.

- [**Ranked influence typology**](https://github.com/davidemiceli/watch-complexity/wiki/Ranked-influence-typology)  <br>*Detect the type of influence that each node holds within a network.*
- [**Network Similarity**](https://github.com/davidemiceli/watch-complexity/wiki/Network-similarity)<br>*Measures the similarity between different networks.*

## Getting started
### Install
```shell
npm install watch-complexity
```
### How to use it
```javascript
const watchcomplexity = require('watch-complexity');
```
Example of use:
```javascript
// The list of edges
const edges = [
  {from: "Napoleon", to: "Myriel", weight: 1},
  {from: "Mme.Magloire", to: "Myriel", weight: 10},
  {...}
];
// Measure the influence score and detect the influence roles
const nodes = watchcomplexity.influence.typology(edges);
```
That will return as result:
```javascript
{
 ranking: 
   [
      {node: "Marius", role: "Hub", score: 100},
      {node: "Courfeyrac", role: "Amplifier", score: 93.68029739776952},
      {node: "Enjolras", role: "Reducer", score: 92.93680297397769},
      {node: "Fantine", role: "Amplifier", score: 89.96282527881041},
      ...,
      {node: "Mme.Hucheloup", role: "Emitter", score: 39.405204460966544},
      {node: "Anzelma", role: "Low emitter", score: 34.94423791821562},
      {node: "Pontmercy", role: "Reducer", score: 33.08550185873605},
      ...
      {node: "OldMan", role: "Emitter branch", score: 1.4869888475836461},
      {node: "Napoleon", role: "Emitter branch", score: 0}
   ],
  nodes: 77,
  edges: 254,
  distribution:  {
    Blackhole: 0,
    Vulcano: 0,
    Channeler: 0,
    Chain: 0,
    Bridge: 1,
    Connector: 3,
    'Emitter branch': 15,
    'Receiver branch': 2,
    Receiver: 2,
    Emitter: 4,
    'Low emitter': 9,
    Idle: 0,
    Transceiver: 5,
    Tophub: 0,
    Hub: 1,
    Dam: 6,
    Reducer: 12,
    Megamplifier: 7,
    Amplifier: 10
  }
}
```

## Tests
Unit tests are inside the folder `/test`, included test coverage through `nyc`.

To run all unit tests, type:
```shell
npm test
```

# Motivation
Our main goal is to do experimental research with practical applications.

# License
WatchComplexity is an open source project available under the [MIT license](https://github.com/davidemiceli/watch-complexity/blob/master/LICENSE).
