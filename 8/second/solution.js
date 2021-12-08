function solution(input) {
    const rows = input.split('\n');
    const decrypted = [];
    for (const row of rows) {
        const [input, output] = row.split(' | ').map(i => i.split(' '));
        const translator = getTranslator(input);
        const result = translate(translator, output);
        decrypted.push(result);
    }
    return decrypted.reduce((a, b) => a + b);
}

function getTranslator(input) {
    const translator = {};
    const one = input.filter(i => i.length === 2)[0];
    const seven = input.filter(i => i.length === 3)[0];
    const equalsA = seven.split('').filter(c => !one.split('').includes(c))[0];
    translator[equalsA] = 'a';
    const six = getSix(input, one);
    const [equalsC, equalsF] = getOneComponents(six, one);
    translator[equalsC] = 'c';
    translator[equalsF] = 'f';
    const three = getThree(input, one);
    const four = input.filter(i => i.length === 4)[0];
    const [equalsB, equalsD, equalsG] = getBDG(three, four, one, seven);
    translator[equalsB] = 'b';
    translator[equalsD] = 'd';
    translator[equalsG] = 'g';
    const equalsE = getE(six, three, four);
    translator[equalsE] = 'e';
    return translator;
}

function getE(six, three, four) {
    return six.split('').filter(c => !(three + four).split('').includes(c))[0];
}

function getBDG(three, four, one, seven) {
    const equalsB = four.split('').filter(c => !three.split('').includes(c))[0];
    const equalsD = four.split('').filter(c => !(one + equalsB).split('').includes(c))[0];
    const equalsG = three.split('').filter(c => !(four + seven).split('').includes(c))[0];
    return [equalsB, equalsD, equalsG];
}

function getThree(arr, one) {
    return arr
        .filter(n => n.length == 5)
        .filter(n => one.split('').every(c => n.split('').includes(c)))[0];
}

function getOneComponents(six, one) {
    const [x, y] = one.split('');
    const f = (six.split('').includes(x)) ? x : y;
    const c = (f == x) ? y : x;
    return [c, f];
}

function getSix(arr, one) {
    return arr
        .filter(n => n.length == 6)
        .filter(n => !one.split('').every(c => n.split('').includes(c)))[0];
}

function translate(translator, output) {
    return +output
        .map(n => n.split('').map(c => translator[c]).sort().join(''))
        .map(sevenSegmentDigit)
        .join('');
}

function sevenSegmentDigit(segments) {
    const translator = {
        'abcefg': '0',
        'cf': '1',
        'acdeg': '2',
        'acdfg': '3',
        'bcdf': '4',
        'abdfg': '5',
        'abdefg': '6',
        'acf': '7',
        'abcdefg': '8',
        'abcdfg': '9'
    };
    return translator[segments];
}


export { solution };