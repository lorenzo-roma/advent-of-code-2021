function getSum(arr, index) {
    return arr[index] + arr[index - 1] + arr[index - 2];
}


function solution(input) {
    const values = input.split('\n').map(i => +i);
    let result = 0;
    for (let i = 3; i < values.length; i++) {
        const last = getSum(values, i);
        const previous = getSum(values, i - 1);
        result += (last > previous);
    }
    return result;
}

export { solution };