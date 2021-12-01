function solution(input) {
    const values = input.split('\n').map(i => +i);
    let res = 0;
    for (let i = 1; i < values.length; i++) {
        res += values[i] > values[i - 1];
    }
    return res;
}

export { solution };