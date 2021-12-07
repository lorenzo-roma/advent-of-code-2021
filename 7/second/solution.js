function solution(input) {
    const positions = input.split(',').map(d => +d);
    const distances = [];
    for (let i = 0; i <= Math.max(...positions); i++) {
        distances.push(calculateDistancesFrom(positions, i));
    }
    return Math.min(...distances);
}

function calculateDistancesFrom(arr, value) {
    const distances = [];
    for (const p of arr) {
        let d = 0;
        const diff = Math.abs(p - value);
        for (let i = 0; i < diff; i++) d += i + 1;
        distances.push(d);
    }
    return distances.reduce((a, b) => a + b);
}


export { solution };