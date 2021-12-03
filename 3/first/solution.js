//I tried to make this as functional as possible,
//I did not try to make it readable :') sorry for that
function solution(input) {
    const rows = input.split('\n').length;
    let length = input.split('\n')[0].split("").length;
    return input
        .split('\n')
        .map(r => r.split("").map(d => +d))
        .reduce((r, a) => a.map((b, i) => (r[i] || 0) + (+b)), [])
        .map(d => Math.floor(d / (rows / 2)))
        .reduce((v, b) => (v[b] += 2 ** (--length), v), [0, 0])
        .reduce((a, b) => a * b);
}


export { solution };