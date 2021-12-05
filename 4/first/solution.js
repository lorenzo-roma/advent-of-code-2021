function solution(input){
    let lines = input.split('\n');
    const numbers = lines[0].split(',').map(n=>+n);
    lines = lines.splice(2);
    const boards = [];
    let newBoard = [];
    for(let i = 0; i<lines.length;i++){
        if(lines[i]=='\r'){
            boards.push(newBoard);
            newBoard = [];
            continue;
        }
        newBoard.push(lines[i].replace(/\s+/g, ' ').trim().split(' ').map(n=>{return {value:+n,used:false};}));
        if(i==lines.length-1){
                        boards.push(newBoard);
        }
    }
    for(const number of numbers){
        for(const board of boards){
            const win = evaluateWin(board, number);
            if(win) return calculatePoints(board,number);
        }
    }
}

function evaluateWin(board, number){
    let rowOk = 0;
    let colOk = 0;
    const dim = board.length;
    for(let i = 0; i<dim; i++){
        rowOk = 0;
        for(let j = 0; j<dim; j++){
            if(board[i][j].value === number){
                board[i][j].used = true;
            }
            if(board[i][j].used) rowOk++;
        }
        if(rowOk==dim) return true;
    }
    for(let i = 0; i<dim; i++){
        colOk = 0;
        for(let j = 0; j<dim; j++){
            if(board[j][i].used) colOk++;
        }
        if(colOk==dim) return true;
    }
    return false;
}

function calculatePoints(board, number){
        return countUnused(board) * number;
}

function countUnused(board){
    const dim = board.length;
    let points = 0;
    for(const row of board)
        for(const col of row)
            if(!col.used) points+=col.value;
    return points;
}


export {solution};