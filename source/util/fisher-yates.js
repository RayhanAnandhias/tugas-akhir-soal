
const randomFrom0UntilN = n => Math.floor(Math.random() * n);

const shuffle = array => {
    const result = [...array];
    let lastIndex = result.length - 1;
    while(lastIndex > 0){
        const randomIndex = randomFrom0UntilN(lastIndex);
        const randonIndexValue = result[randomIndex];
        const lastIndexValue = result[lastIndex];
        result[lastIndex] = randonIndexValue;
        result[randomIndex] = lastIndexValue;
        lastIndex--;
    }
    return result;
}

module.exports = shuffle;
