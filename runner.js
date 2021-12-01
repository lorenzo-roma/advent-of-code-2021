import { readdirSync, readFileSync } from 'fs';

function correctAnswer(result, solution, index) {
    console.log(`TEST-${index}: Result is correct! ${result} == ${solution}`);
}

function wrongAnswer(result, solution, index) {
    console.log(`TEST-${index}: Result is wrong! Expected ${solution} found ${result}!`);
}


function checkResult(result, index, testDir) {
    const output = readFileSync(`${testDir}/output${index}.txt`, 'utf8');
    (output == result) ?
        correctAnswer(result, output, index) :
        wrongAnswer(result, output, index);
}

async function main() {
    const solutionPath = process.argv[2];
    const solutionModule = await import(solutionPath);
    const solution = solutionModule.solution;

    const testDir = solutionPath.split('/').slice(0, -1).join('/');
    const tests = readdirSync(testDir).filter(fn => fn.startsWith('input'));

    for (let i = 1; i <= tests.length; i++) {
        const input = readFileSync(`${testDir}/input${i}.txt`, 'utf8');
        const res = solution(input);
        checkResult(res, i, testDir)
    }

}

main().catch((err) => console.log(err));
