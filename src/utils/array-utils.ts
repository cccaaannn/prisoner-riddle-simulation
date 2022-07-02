export const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getRandomArray = (size: number): number[] => {
    const arr: number[] = []
    for (let i = 0; i < size; i++) {
        arr.push(i)
    }
    return shuffleArray(arr);
}
