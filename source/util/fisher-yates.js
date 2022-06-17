const randomFrom0UntilN = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = (array) => {
  const result = [...array];
  let lastIndex = result.length - 1;
  while (lastIndex > 0) {
    const randomIndex = randomFrom0UntilN(0, lastIndex);
    const randomIndexValue = result[randomIndex];
    const lastIndexValue = result[lastIndex];
    result[lastIndex] = randomIndexValue;
    result[randomIndex] = lastIndexValue;
    lastIndex--;
  }
  return result;
};

module.exports = shuffle;
