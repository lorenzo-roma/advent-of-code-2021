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

function isDiagonal(r) {
    return r.start.y != r.end.y && r.start.x != r.end.x;
}

function isStill(r) {
    return r.start.x == r.end.x && r.start.y == r.end.y;
}

function isHorizontal(r) {
    return r.start.y === r.end.y && r.start.x != r.end.x;
}

function isVertical(r) {
    return r.start.x === r.end.x && r.start.y != r.end.y;
}

function traceRoute(r, nodes) {
    let start;
    let end
    if (isDiagonal(r) || isHorizontal(r)) {
        start = r.start.x < r.end.x ? r.start : r.end;
        end = r.start.x < r.end.x ? r.end : r.start;
    }
    if (isVertical(r)) {
        start = r.start.y > r.end.y ? r.end : r.start;
        end = r.start.y > r.end.y ? r.start : r.end;
    }
    if (isStill(r)) return addNode(nodes, r.start);

    if (isDiagonal(r)) {
        for (let i = 0; i <= end.x - start.x; i++) {
            const position = {};
            position.x = start.x + i;
            position.y = (start.y < end.y) ? start.y + i : start.y - i;
            addNode(nodes, position);
        }
        return;
    }

    if (isHorizontal(r)) {
        for (let i = start.x; i <= end.x; i++) addNode(nodes, { x: i, y: start.y })
    }
    if (isVertical(r)) {
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