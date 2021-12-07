function solution(input) {
    return input
        .split(',')
        .map(d => +d)
        .sort((a, b) => a - b)
        .map((p, _, arr) => Math.abs(median(arr) - p))
        .reduce((a, b) => a + b);
}

function median(a) {
    const middle = Math.floor(a.length / 2);
    return (a.length % 2 === 0) ? a[middle - 1] : a[middle];
}

export { solution };