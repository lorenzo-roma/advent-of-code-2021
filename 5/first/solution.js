function solution(input) {
    const routes = input.split('\n').map(r => r.split(' -> ')).map(p => {
        const start = p[0].split(',').map(d => +d);
        const end = p[1].split(',').map(d => +d);
        return { start: { x: start[0], y: start[1] }, end: { x: end[0], y: end[1] }, z: 0 }
    });
    const nodes = {};
    routes.forEach(r => traceRoute(r, nodes));
    return countMax(nodes);
}

function traceRoute(r, nodes) {
    let start;
    let end
    if (r.start.y != r.end.y && r.start.x != r.end.x) return;
    if (r.start.y === r.end.y) {
        if (r.start.x > r.end.x) {
            start = r.end;
            end = r.start;
        } else {
            start = r.start;
            end = r.end;
        }
    } else {
        if (r.start.y > r.end.y) {
            start = r.end;
            end = r.start;
        } else {
            start = r.start;
            end = r.end;
        }
    }
    if (start.x == end.x && start.y == end.y) {
        addNode(nodes, start);
        return;
    }
    if (end.x > start.x) {
        for (let i = start.x; i <= end.x; i++) addNode(nodes, { x: i, y: start.y })
    } else {
        for (let i = start.y; i <= end.y; i++) addNode(nodes, { x: start.x, y: i })
    }
}


function addNode(nodes, position) {
    const key = position.x + ";" + position.y;
    nodes[key] = (nodes[key] || 0) + 1;
}

function countMax(nodes) {
    return Object.values(nodes).filter(v => v > 1).length;
}

export { solution }