/**
 * Node Class
 */

class Node {
  constructor(data) {
    this.data = data;
    this.adjacents = [];
    this.paket = 0;
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const idx = this.adjacents.indexOf(node);
    if (idx !== -1) {
      this.adjacents.splice(idx, 1);
      return node;
    }
    return null;
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) !== -1;
  }

  getAdjacents() {
    return this.adjacents;
  }

  getData() {
    return this.data;
  }

  getPaket() {
    return this.paket;
  }
}

module.exports = Node;
