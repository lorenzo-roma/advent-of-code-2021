function solution(input) {
    const commands = input.split('\n').map(r => r.split(" "));
    let x = 0;
    let y = 0;
    const executor = {
        "down": v => y += v,
        "up": v => y -= v,
        "forward": v => x += v
    }
    commands.forEach(([command, value]) => executor[command](+value));
    return x * y;
}



export { solution };