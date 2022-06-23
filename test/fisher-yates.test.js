const assert = require("assert");
const fisherYates = require("../source/util/fisher-yates");


/*
  Test Case Id : MDL1-1
*/
const testCaseMDL1_1 =  () => {
  it("MDL1 - 1", () => {
    const startingArray = [1,2,3,4,5];
    const fisherYatesResult = fisherYates(startingArray);
      assert.equal(startingArray.length , fisherYatesResult.length);
  });
}

/*
  Test Case Id : MDL1-2
*/
const testCaseMDL1_2 =  () => {
  it("MDL1 - 2", () => {
    const startingArray = [];
    const fisherYatesResult = fisherYates(startingArray);
      assert.equal(startingArray.length , fisherYatesResult.length);
  });
}


describe("Fisher Yates Module", () => {
  testCaseMDL1_1();
  testCaseMDL1_2();
});
