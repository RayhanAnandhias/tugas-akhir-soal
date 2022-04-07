/**
 * Modelling ketetanggaan dari row dan column
 * Menentukan jumlah paket soal dari hasil graph coloring
 *
 */

const Digraph = require("./graph");

const graphModelling = (baris, kolom, jarakBaris, jarakKolom) => {
  const graph = new Digraph(baris, kolom, jarakBaris, jarakKolom);

  for (let i = 0; i < baris * kolom; i++) {
    for (let j = 0; j < baris * kolom; j++) {
      graph.addEdge(i, j);
    }
  }

  for (const [keyIndex, node] of graph.nodes) {
    console.log(node);
  }
};

const graphColoring = (digraph) => {};

graphModelling(3, 4, 110, 110);

module.exports = {
  graphModelling,
  graphColoring
};
