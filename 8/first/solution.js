function solution(input) {
    const outputs = input.split('\n').map(r => r.split(' | ')[1].split(' ')).flat();
    return outputs.filter(n => (n.length === 2) || (n.length == 4) || (n.length == 3) || (n.length == 7)).length;

}

export { solution };