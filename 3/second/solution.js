function solution(input) {

    const numbers = input.split("\n").map(r => r.split("").map(d => +d));
    const numLength = numbers[0].length;
    return new Array(numLength)
        .fill(0)
        .map((v, i) => +i)
        .reduce((values, i) =>
            values.map((arr, swap) => {
                const b = getCommonBit(i, arr);
                return arr.length == 1 ? arr :
                    arr.filter(n => n[i] == (swap) ? !b : b)
            })
            , [numbers, numbers])
        .map(b => toDecimal(b[0]))
        .reduce((a, b) => a * b);
}


export { solution };


function getCommonBit(i, arr) {
    const d = arr.reduce((v, n) => v + n[i], 0);
    return Math.floor(d / (arr.length / 2));
}

function toDecimal(binary) {
    let length = binary.length;
    return binary
        .map((d) => d * (2 ** (--length)))
        .reduce((a, b) => a + b);
}

