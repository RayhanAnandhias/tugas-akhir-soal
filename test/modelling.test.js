const assert = require("assert");
const Graph = require("../source/util/graph");


const testCaseMDL2_1 = () => {
  it("MDL2 - 1", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 1;
    const destination = 1;
    assert.equal(graph.checkSyarat(source, destination), false);
  });
};

const testCaseMDL2_2 = () => {
  it("MDL2 - 2", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 1;
    const destination = 2;
    assert.equal(graph.checkSyarat(source, destination), true);
  });
};

const testCaseMDL2_3 = () => {
  it("MDL2 - 3", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 6;
    const destination = 1;
    assert.equal(graph.checkSyarat(source, destination), true);
  });
};

const testCaseMDL2_4 = () => {
  it("MDL2 - 4", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 1;
    const destination = 6;
    assert.equal(graph.checkSyarat(source, destination), false);
  });
};

const testCaseMDL2_5 = () => {
  it("MDL2 - 5", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 6;
    const destination = 0;
    assert.equal(graph.checkSyarat(source, destination), true);
  });
};

const testCaseMDL2_6 = () => {
  it("MDL2 - 6", () => {
    const graph = new Graph(5, 5, 110, 110);
    const source = 0;
    const destination = 6;
    assert.equal(graph.checkSyarat(source, destination), false);
  });
};

describe("Modelling Module", () => {
  testCaseMDL2_1();
  testCaseMDL2_2();
  testCaseMDL2_3();
  testCaseMDL2_4();
  testCaseMDL2_5();
  testCaseMDL2_6();
});
