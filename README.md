# Watch Complexity
Artificial Intelligence from experimental research on computational social science.

## Ranked influence typology

### Description
Detect the type of influence that each node holds within a network.

The algorithm detect not only the influence played by every node inside a network, but also how it contributes to the overall network (for example the word-of-mouth, content creation, and diffusion of information).

Given a large dataset of connections as input, it provides a ranking of all nodes by influence score, reporting their typology of influence. Every node plays a certain role in the network and affects the other nodes in its own different way.

### How to use it
```javascript
const watchcomplexity = require('./index');
```
#### Ranked influence typology

```javascript
watchcomplexity.influence.typology(edges=Array[Object])
```

Field	| Type | Required	| Description
--- | --- | --- | ---
edges	| [object] | yes | An array of all the connections between nodes.
edges > from | string	| yes	| The node's name or id where the edge start: the source node of the link.
edges > to | string	| yes	| The node's name or id where the edge end: the target node of the link.
edges > weight | number	| yes	| The weight of the connection: how strong is the bond among the linked nodes.

Example
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
That will return:
```json
{
 "ranking": 
   [
      {"node": "Marius","role": "Hub","score": 100},
      {"node": "Courfeyrac","role": "Amplifier","score": 93.68029739776952},
      {"node": "Enjolras","role": "Reducer","score": 92.93680297397769},
      {"node": "Fantine","role": "Amplifier","score": 89.96282527881041},
      ...,
      {"node": "Mme.Hucheloup","role": "Emitter","score": 39.405204460966544},
      {"node": "Anzelma","role": "Low emitter","score": 34.94423791821562},
      {"node": "Pontmercy","role": "Reducer","score": 33.08550185873605},
      ...
      {"node": "OldMan","role": "Emitter branch","score": 1.4869888475836461},
      {"node": "Napoleon","role": "Emitter branch","score": 0}
   ],
  "nodes": 77,
  "edges": 254,
  "distribution":  {
      "Blackhole": 0,
      "Vulcano": 0,
      "Channeler": 0,
      "Chain": 0,
      "Bridge": 1,
      "Connector": 3,
      "Emitter branch": 15,
      "Receiver branch": 2,
      "Receiver": 2,
      "Emitter": 4,
      "Low emitter": 9,
      "Idle": 0,
      "Transceiver": 5,
      "Tophub": 0,
      "Hub": 1,
      "Dam": 6,
      "Reducer": 12,
      "Megamplifier": 7,
      "Amplifier": 10
   }
}
```

## Tests
The algorithms are deep tested. Unit tests are inside the folder `/test`, included test coverage through `nyc`.

To run all unit tests, type:
```shell
npm test
```
