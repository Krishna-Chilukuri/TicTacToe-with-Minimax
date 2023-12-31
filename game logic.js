var winList = [[[0, 0], [0,1], [0, 2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]],
                [[0, 0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
                [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]];
                //0 , 1, 2
                //3, 4, 5
                //6, 7
                //Again in each of these indices there are 3 points.
                //So, each point is referenced by [0][0] = [0, 0] from winList[0]
                //Now, for each of the inner 0's, it's [0][0][0]
var xoMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// var xoMatrix = [[1, 2, 1], [2, 2, 2], [0, 1, 1]];
// var currentMove = 1;
modeOfGame = 0;

// for (let index = 0; index < winList.length; index++) {
//     const element = winList[index];
//     for (let index1 = 0; index1 < element.length; index1++) {
//         const element1 = element[index1];
//         console.log(element1);
        
//     }
// }

// console.log("AFTER FOR")
// console.log(winList[0][0])

function checkForWin(val){

    return winList.some(listof3 => {
        // console.log(xoMatrix[listof3[0][0]][listof3[0][1]], xoMatrix[listof3[1][0]][listof3[1][1]], xoMatrix[listof3[2][0]][listof3[2][1]])
        if (xoMatrix[listof3[0][0]][listof3[0][1]] == xoMatrix[listof3[1][0]][listof3[1][1]] && xoMatrix[listof3[1][0]][listof3[1][1]] == xoMatrix[listof3[2][0]][listof3[2][1]] && xoMatrix[listof3[2][0]][listof3[2][1]] == val) {
            // console.log("INSIDE THE IF")
            return true;            
        }
    });
}

function isGameNotOver(){
    return xoMatrix.some(row => {
        return row.some(cell => {
            // console.log(cell)
            if(cell == 0){
                return true;
            }
        });
    });
}

function getCellsAvailable(){
    emptyCells = [];
    for (let rowIndex = 0; rowIndex < xoMatrix.length; rowIndex++) {
        const row = xoMatrix[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const element = row[colIndex];
            if(element == 0){
                emptyCells.push([rowIndex, colIndex]);
            }   
        }        
    }
    return emptyCells;
}

function returnScore(depth){
    if(checkForWin(1)) {
        return depth - 10;
    }
    else if (checkForWin(2)) {
        return 10 - depth;
    } 
    else {
        return 0
    }
}

function checkForUserWin(cell){
    xoMatrix[cell[0]][cell[1]] = 1;
    if(checkForWin(1)){
        xoMatrix[cell[0]][cell[1]] = 0;
        return true;
    }
    xoMatrix[cell[0]][cell[1]] = 0;
    return false;
}

function checkForAIWin(cell){
    xoMatrix[cell[0]][cell[1]] = 2;
    if(checkForWin(2)){
        xoMatrix[cell[0]][cell[1]] = 0;
        return true;
    }
    xoMatrix[cell[0]][cell[1]] = 0;
    return false;
}

function miniMax(depth, currentMove){
    if(currentMove == 3) {
        currentMove = 1;
        depth += 1;
    }
    // let a = prompt("dkakjdsbn");
    if(!isGameNotOver()) {
        let retArr = [];
        retArr.push(returnScore(depth));
        // return [returnScore(depth)];
        return retArr;
    }
    // let aa = prompt("dkakjdsbn");
    let scores = [];
    let moves = getCellsAvailable();

    moves.forEach(move => {
        // console.log(move);
        // let xx = prompt("AKHDjk");
        if(currentMove == 1 && checkForAIWin(move)) {
            scores.push(10 - depth);
        }
        else if (currentMove == 2 && checkForUserWin(move)) {
            scores.push(depth - 10);
        } 
        else {
            if(currentMove == 1) {
                xoMatrix[move[0]][move[1]] = 2;
            }
            else {
                xoMatrix[move[0]][move[1]] = 1;
            }
            // xoMatrix[move[0]][move[1]] = currentMove - 1;//CHECK THIS
            // console.log("PUSH START");
            let retVal = miniMax(depth, currentMove + 1);
            // console.log(retVal, retVal[0]);
            // if(retVal[0] == undefined) {
                // console.log("UNDEFINED RETURNED");
                // let xad = prompt("WAITING!!!!");
            // }
            scores.push(retVal[0]);
            // console.log(scores);
            xoMatrix[move[0]][move[1]] = 0;
        }
    });
    if(currentMove == 1){
        let maxScoreInd = 0;
        for (let index = 0; index < scores.length; index++) {
            const element = scores[index];
            if(element > scores[maxScoreInd]) {
                maxScoreInd = index;
            }
        }
        // let maxScoreInd = scores.indexOf(Math.max(scores));
        let choice = moves[maxScoreInd];
        // console.log("RETURNING FROM IF", maxScoreInd, choice, scores);
        // console.log("SCORES IS: ",scores)
        return [scores[maxScoreInd], choice, scores, moves]
    }
    else{
        let minScoreInd = 0;
        for (let index = 0; index < scores.length; index++) {
            const element = scores[index];
            if (element < scores[minScoreInd]){
                minScoreInd = index;
            }
        }
        // let minScoreInd = scores.indexOf(Math.min(scores));
        let choice = moves[minScoreInd];
        // console.log("RETURNING FROM ELSE", minScoreInd, scores);
        return [scores[minScoreInd], choice, scores, moves]
    }
}

// console.log(checkForWin(1));
// console.log(isGameNotOver());
// console.log(getCellsAvailable());
// console.log(xoMatrix);
// console.log(winList);
// console.log(returnScore(0));
// console.log("JKAFhfjkn");
// console.log(checkForUserWin([1,2]))

while (true) {
    var prompt = require("prompt-sync")({sigint: true});
    // let x1 = prompt("TESTING!!");
    console.log(xoMatrix);
    if(!isGameNotOver()){
        console.log("It's a Win - Win situation");
        break;
    }
    if(checkForWin(2)){
        console.log("My AI Won against u, LOL");
        break;
    }
    
    let iPos = prompt("Enter i position: ");
    let jPos = prompt("Enter j position: ");
    if(xoMatrix[iPos][jPos] == 0) {
        xoMatrix[iPos][jPos] = 1;
    }
    else {
        console.log("Invalid Position, Select another Position");
        continue;
    }
    if(checkForWin(1)) {
        console.log("U WON!!!!!!");
        console.log(xoMatrix);
        break;
    }
    if(!isGameNotOver()) {
        console.log("It's a Win - Win situation!");
        break;
    }
    // let xpos = prompt("AJKRGHJK");
    let retCell = miniMax(0, 1);
    // let axpos = prompt("AJKRsdfggsGHJK");
    console.log(retCell);
    retCell = retCell[1];
    xoMatrix[retCell[0]][retCell[1]] = 2;
        // console.log(xoMatrix);
}