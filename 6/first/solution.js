function solution(input) {
    return new Array(80)
        .fill(0)
        .reduce(dayPasses, inputFormatter(input))
        .length;
}

const dayPasses = (p) => p.map(f => grow(f)).flat();
const inputFormatter = (i) => i.split(',').map(d => +d);
const grow = (f) => (f == 0) ? [6, 8] : [--f];


export { solution };