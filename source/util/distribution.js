/**
 * Modelling ketetanggaan dari row dan column
 * Menentukan jumlah paket soal dari hasil graph coloring
 *
 */

const Digraph = require("./graph");

/**
 *
 * @param {number} baris
 * @param {number} kolom
 * @param {number} jarakBaris
 * @param {number} jarakKolom
 * @returns {Digraph}
 */
const graphModelling = (baris, kolom, jarakBaris, jarakKolom) => {
  const graph = new Digraph(baris, kolom, jarakBaris, jarakKolom);

  for (let i = 0; i < baris * kolom; i++) {
    for (let j = 0; j < baris * kolom; j++) {
      graph.addEdge(i, j);
    }
  }

  return graph;
};

/**
 *
 * @param {Digraph} digraph
 * @returns {*}
 */
const graphColoring = (digraph) => {
  const vertexOrder = [];

  // sort node descending by degree
  new Map(
    [...digraph.nodes].sort(
      (a, b) => b[1].adjacents.length - a[1].adjacents.length
    )
  ).forEach((el) => {
    vertexOrder.push(el.data);
  });

  const colorIndex = {};
  let currentColor = 0;

  while (vertexOrder.length > 0) {
    const root = vertexOrder.shift();
    colorIndex[root] = currentColor;

    const myGroup = [];
    myGroup.push(root);

    for (let i = 0; i < vertexOrder.length; ) {
      const p = vertexOrder[i];
      let conflict = false;

      for (let j = 0; j < myGroup.length; j++) {
        if (
          digraph.areAdjacents(myGroup[j], p) ||
          digraph.areAdjacents(p, myGroup[j])
        ) {
          i++;
          conflict = true;
          break;
        }
      }

      if (conflict) {
        continue;
      }

      colorIndex[p] = currentColor;
      myGroup.push(p);
      vertexOrder.splice(i, 1);
    }

    currentColor++;
  }

  for (let [key, value] of digraph.nodes) {
    value.paket = colorIndex[value.data];
  }

  const arrColor = Object.values(colorIndex);
  const maxColor = Math.max(...arrColor);

  const result = {
    chromaticNumber: maxColor + 1,
    graph: digraph.toStringNodes()
  };

  console.log(result);

  return result;
};

// graphModelling(3, 4, 110, 110);
// graphColoring(graphModelling(3, 3, 110, 110));

module.exports = {
  graphModelling,
  graphColoring
};
