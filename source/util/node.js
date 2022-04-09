/**
 * Node Class
 */

class Node {
  constructor(data) {
    this.data = data;
    this.adjacents = [];
    this.paket = 0;
  }

  /**
   *
   * @param {Node} node
   */
  addAdjacent(node) {
    this.adjacents.push(node);
  }

  /**
   *
   * @param {Node} node
   */
  removeAdjacent(node) {
    const idx = this.adjacents.indexOf(node);
    if (idx !== -1) {
      this.adjacents.splice(idx, 1);
      return node;
    }
    return null;
  }

  /**
   *
   * @param {Node} node
   */
  isAdjacent(node) {
    return this.adjacents.indexOf(node) !== -1;
  }

  /**
   *
   * @param {Node} node
   */
  getAdjacents() {
    return this.adjacents;
  }

  /**
   *
   * @param {Node} node
   */
  getData() {
    return this.data;
  }

  /**
   *
   * @param {Node} node
   */
  getPaket() {
    return this.paket;
  }
}

module.exports = Node;
