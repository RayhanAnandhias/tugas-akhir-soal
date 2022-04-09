/**
 * Directed Graph Class
 */

const Node = require("./node");

class Digraph {
  constructor(baris, kolom, jarakBaris, jarakKolom) {
    this.baris = baris;
    this.kolom = kolom;
    this.jarakBaris = jarakBaris;
    this.jarakKolom = jarakKolom;
    this.nodes = new Map();
  }

  addVertex(keyIndex) {
    if (this.nodes.has(keyIndex)) {
      return this.nodes.get(keyIndex);
    } else {
      const vertex = new Node(keyIndex);
      this.nodes.set(keyIndex, vertex);
      return vertex;
    }
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destNode = this.addVertex(destination);

    if (this.#checkSyarat(source, destination) === true) {
      sourceNode.addAdjacent(destNode);
      return [sourceNode, destNode];
    } else {
      return null;
    }
  }

  #checkSyarat(source, destination) {
    const kolomSource = this.getKolom(source);
    const barisSource = this.getBaris(source);
    const kolomDest = this.getKolom(destination);
    const barisDest = this.getBaris(destination);

    if (source === destination) {
      return false;
    }

    if (barisSource === barisDest) {
      return this.jarakKolom * Math.abs(kolomSource - kolomDest) < 220;
    }

    if (kolomSource === kolomDest) {
      return barisSource > barisDest
        ? this.jarakBaris * Math.abs(barisSource - barisDest) < 220
        : false;
    }

    if (barisSource > barisDest) {
      const selisihBaris = Math.abs(barisDest - barisSource);
      const selisihKolom = Math.abs(kolomSource - kolomDest);
      return (
        Math.sqrt(
          Math.pow(selisihBaris * this.jarakBaris, 2) +
            Math.pow(selisihKolom * this.jarakKolom, 2)
        ) < 220
      );
    }

    return false;
  }

  removeVertex(data) {
    const current = this.nodes.get(data);
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current);
      }
    }
    return this.nodes.delete(data);
  }

  removeEdge() {
    const sourceNode = this.nodes.get(source);
    const destNode = this.nodes.get(destination);

    if (sourceNode && destNode) {
      sourceNode.removeAdjacent(destNode);
    }

    return [sourceNode, destNode];
  }

  areAdjacents(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destNode = this.nodes.get(destination);

    if (sourceNode && destNode) {
      return sourceNode.isAdjacent(destNode);
    }

    return false;
  }

  getKolom(data) {
    if (this.nodes.has(data)) {
      return (data % this.kolom) + 1;
    } else {
      return null;
    }
  }

  getBaris(data) {
    if (this.nodes.has(data)) {
      return Math.floor(data / this.kolom) + 1;
    } else {
      return null;
    }
  }

  toStringNodes() {
    console.log([...this.nodes.entries()]);
  }
}

module.exports = Digraph;
