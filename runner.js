import { readdirSync, readFileSync } from 'fs';

async function main() {
    const solutionPath = process.argv[2];
    const solutionModule = await import(solutionPath);
    const solution = solutionModule.solution;

    function correctAnswer(result, solution, index) {
        console.log(`TEST-${index}: Result is correct! ${result} == ${solution}`);
    }

    function wrongAnswer(result, solution, index) {
        console.log(`TEST-${index}: Result is wrong! Expected ${solution} found ${result}!`);
    }


    const testDir = solutionPath.split('/').slice(0, -1).join('/');
    const files = readdirSync(testDir).filter(fn => fn.startsWith('input'));

    function checkResult(result, index) {
        const output = readFileSync(`${testDir}/output${index}.txt`, 'utf8');
        (output == result) ? correctAnswer(result, output, index) : wrongAnswer(result, output, index);
    }

    for (let i = 1; i <= files.length; i++) {
        const input = readFileSync(`${testDir}/input${i}.txt`, 'utf8');
        const res = solution(input);
        checkResult(res, i)
    }

}

main().catch((err) => console.log(err));
