function solution(input) {
    const initials = input.split(',').map(d => +d);
    let array = new Array(9).fill(0);
    for (const value of initials) array[value]++;
    return new Array(256).fill(0)
        .reduce(grow, array)
        .reduce(sum);
}

const grow = (arr) => {
    const newArr = new Array(9).fill(0);
    for (const i in arr) {
        if (i == 0) {
            newArr[8] += arr[i];
            newArr[6] += arr[i];
        } else {
            newArr[i - 1] += arr[i];
        }
    }
    return newArr;
}

const sum = (a, b) => a + b;


export { solution };