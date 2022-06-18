const randGen = require('seed-random');
const rand = randGen();

const shuffle = (array) => {
  let result = [...array];
  let lastIndex = result.length;
  while (0 !== lastIndex) {
    let randomIndex = Math.floor(rand() * lastIndex--);
    let tempValue = result[lastIndex];
    result[lastIndex] = result[randomIndex];
    result[randomIndex] = tempValue;
  }
  return result;
};

module.exports = shuffle;
