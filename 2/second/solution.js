function solution(input) {
    const commands = input.split('\n').map(r => r.split(" "));
    let x = 0;
    let y = 0;
    let aim = 0;
    const executor = {
        "down": v => aim += v,
        "up": v => aim -= v,
        "forward": v => {
            x += v;
            y += aim * v;
        }
    }
    commands.forEach(([command, value]) => executor[command](+value));
    return x * y;
}



export { solution };