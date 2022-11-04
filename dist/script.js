//++++++++++++++++++++++ Button Variables ++++++++++++++++++++++ //
const playBtn = document.querySelector("#start__button__playervsplayer");
const rulesBtn = document.querySelector("#start__button__rules");
const ruleCloseBtn = document.querySelector(".rules__button");
const menuBtn = document.querySelector("#menu");
const continueGame = document.querySelector("#continue__game");
const restartGame = document.querySelector("#restart__game");
const quitGame = document.querySelector("#quit__game");
const restart1 = document.querySelector("#restart");
const restart2 = document.querySelector("#restart__game");
const restartArr = [restart1, restart2];
const playAgain = document.querySelector(".game__win__button");

//++++++++++++++++++++++ Display Variables ++++++++++++++++++++++ //
const startPopUp = document.querySelector(".start");
const gameDisplay = document.querySelector(".game");
const gameShadow = document.querySelector(".game__shadow");
const rulesPopUp = document.querySelector(".rules");
const gamePause = document.querySelector(".game__pause");
const counterForP1 = document.querySelector("#scorePlayer1");
const counterForP2 = document.querySelector("#scorePlayer2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;
const winMsg = document.querySelector(".game__win");
const gameMain = document.querySelector(".game__main");

//++++++++++++++++++++++ Button Handling ++++++++++++++++++++++ //
playBtn.addEventListener("click", () => {
    startPopUp.classList.add("hide");
    gameDisplay.classList.remove("hide");
    gameShadow.classList.remove("hide");
    newGame();
})

//Show Rules.
rulesBtn.addEventListener("click", () => {
    startPopUp.classList.add("hide");
    rulesPopUp.classList.remove("hide");
})

//Close Rules.
ruleCloseBtn .addEventListener("click", () => {
    rulesPopUp.classList.add("hide");
    startPopUp.classList.remove("hide");
})

//Show Pause menu.
menuBtn.addEventListener("click", () => {
    gamePause.classList.remove("hide");
    isPaused = true;
})

//Resume Game.
continueGame.addEventListener("click", () => {
    gamePause.classList.add("hide");
    isPaused = false;
})

//Quit Game.
quitGame.addEventListener("click", () => {
    location.reload();
})

//++++++++++++++++++++++ Start Game function ++++++++++++++++++++++ //
    //Variables for timer function.
    const remainingTime = document.querySelector(".game__timer__box__timeleft__time");
    const gameTimerBox = document.querySelector(".game__timer__box");
    const gameTimerNum = document.querySelector(".game__timer__box__num");
    let isPaused = false
    let timeLeft = parseInt(remainingTime.textContent);

const newGame = () => {
    const timer = () => {
        if (timeLeft == 0){
            timeLeft = 30;
            switchPlayer();
        } else if (!isPaused){
            timeLeft--;
        }
        remainingTime.textContent = timeLeft
    }
    const timerFunction = setInterval(timer, 1000)
    counterForP1.textContent = scorePlayer1;
    counterForP2.textContent = scorePlayer2;

}

//++++++++++++++++++++++ Restart & Replay functions ++++++++++++++++++++++ //

//Restart Game.
restartArr.forEach(elem => {
    elem.addEventListener("click", () => {
        resetAll();
    })
})

//Restart function.
const resetAll = () => {
    //Reset Time.
    timeLeft = 30;
    remainingTime.textContent = 30;
    //Reset GameMap.
    for(const column in gameMap){
        for(const row in gameMap[column]){
            gameMap[column][row] = 0;
        }
    }

    //Reset Chips.
    let chipRows = document.querySelectorAll(".target-rows");
    chipRows.forEach(row => {
        row.innerHTML = " ";
    })

    //Reset counter.
    counterForP1.textContent = "0";
    counterForP2.textContent = "0";
    scorePlayer1 = 0;
    scorePlayer2 = 0;

    //Reset shadow.
    gameShadow.classList.remove("pink");
    gameShadow.classList.remove("yellow");
    
}

//Play Again.
playAgain.addEventListener("click", () => {
    resetField();
    winMsg.classList.add("hide");
    gameMain.classList.remove("no-click");
})

//++++++++++++++++++++++ Game functions ++++++++++++++++++++++ //
//Create an object which represents the playing field for checking & handling.
const gameMap = {
    1: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    2: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    3: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    4: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    5: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    6: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    7: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
}

//Handle player inputs. This is where the magic happens.
const rows = document.querySelectorAll(".click");
rows.forEach(row => {
    row.addEventListener("click", event => {
        //Update GameMap according to click.
        playerMove(event);
        //Check if move won the round.
        checkWin();
        //Switch player.
        switchPlayer();
        //Switch (restart) timer
        switchTimer();
    })
})

const playerMove =  event => {
    let currentPlayer = gameDisplay.getAttribute("player");
    let clickedRow = gameMap[parseInt(event.target.id)];

    let rowID = event.target.id;
    let targetRow = document.querySelector(`#row${rowID}`);

    //Parse clicked row and update UI.
    const parseMove = (clickedRow) =>{
        
            if(gameMap[rowID][clickedRow] === "player1"){
                targetRow.insertAdjacentHTML("beforeend", '<div class="chip-div"><img class="player1-chip-mobile" src="assets/images/counter-red-small.svg" alt=""><img class="player1-chip-desktop" src="assets/images/counter-red-large.svg" alt=""><img class="marked-chip hide" src="assets/images/oval.png"></div>')
            }
            if(gameMap[rowID][clickedRow] === "player2"){
                targetRow.insertAdjacentHTML("beforeend", `<div class="chip-div"><img class="player2-chip-mobile" src="assets/images/counter-yellow-small.svg" alt=""><img class="player2-chip-desktop" src="assets/images/counter-yellow-large.svg" alt=""><img class="marked-chip hide" src="assets/images/oval.png"></div>`)
            }
        
    }

    //Locate where click happend and update gamemap and UI.
    if (clickedRow[1] == 0) {
        clickedRow[1] = currentPlayer;
        return parseMove(1);
    }
    if (clickedRow[2] == 0) {
        clickedRow[2] = currentPlayer;
        return parseMove(2);
    }
    if (clickedRow[3] == 0) {
        clickedRow[3] = currentPlayer;
        return parseMove(3);
    }
    if (clickedRow[4] == 0) {
        clickedRow[4] = currentPlayer;
        return parseMove(4);
    }
    if (clickedRow[5] == 0) {
        clickedRow[5] = currentPlayer;
        return parseMove(5);
    }
    if (clickedRow[6] == 0) {
        clickedRow[6] = currentPlayer;
        return parseMove(6);
    } 
}

const checkWin = () => {
    //Create array for handling.
    const gameArr = [];
    for(const row in gameMap){
        let pushArr = [];
        for(let i = 1; i <= 6; i++){
            pushArr.push(gameMap[row][i])
        }
        gameArr.push(pushArr);
    }

    //Check horizontal.
    for(let i = 0; i <= 3; i++){
        for(let j = 0; j < gameArr[i].length; j++){
            if(gameArr[i][j] === "player1"){
                if(gameArr[i+1][j] ==="player1"){
                    if(gameArr[i+2][j] ==="player1"){
                        if(gameArr[i+3][j] ==="player1"){
                            updateWinCounter();
                            showWinner();
                            horizontalWinner(i,j);
                        }
                    }
                }
            }
            if(gameArr[i][j] === "player2"){
                if(gameArr[i+1][j] ==="player2"){
                    if(gameArr[i+2][j] ==="player2"){
                        if(gameArr[i+3][j] ==="player2"){
                            updateWinCounter();
                            showWinner();
                            horizontalWinner(i,j);
                        }
                    }
                }
            }
        }
    }
    //Check diagonal bottom top.
    for(let i = 0; i <= 3; i++){
        for(let j = 0; j < gameArr[i].length; j++){
            if(gameArr[i][j] === "player1"){
                if(gameArr[i+1][j+1] ==="player1"){
                    if(gameArr[i+2][j+2] ==="player1"){
                        if(gameArr[i+3][j+3] ==="player1"){
                            updateWinCounter();
                            showWinner();
                            diagonalBottomTopWinner(i,j);
                        }
                    }
                }
            }
            if(gameArr[i][j] === "player2"){
                if(gameArr[i+1][j+1] ==="player2"){
                    if(gameArr[i+2][j+2] ==="player2"){
                        if(gameArr[i+3][j+3] ==="player2"){
                            updateWinCounter();
                            showWinner();
                            diagonalBottomTopWinner(i,j);
                        }
                    }
                }
            }
        }
    }

    //Check diagonal top bottom.
    for(let i = 0; i <= 3; i++){
        for(let j = 0; j < gameArr[i].length; j++){
            if(gameArr[i][j] === "player1"){
                if(gameArr[i+1][j-1] ==="player1"){
                    if(gameArr[i+2][j-2] ==="player1"){
                        if(gameArr[i+3][j-3] ==="player1"){
                            updateWinCounter();
                            showWinner();
                            diagonalTopBottomWinner(i,j);
                        }
                    }
                }
            }
            if(gameArr[i][j] === "player2"){
                if(gameArr[i+1][j-1] ==="player2"){
                    if(gameArr[i+2][j-2] ==="player2"){
                        if(gameArr[i+3][j-3] ==="player2"){
                            updateWinCounter();
                            showWinner();
                            diagonalTopBottomWinner(i,j);
                        }
                    }
                }
            }
        }
    }

    //Check vertical.
    for(let i = 0; i <= 3; i++){
        for(let j = 0; j < gameArr[i].length; j++){
            if(gameArr[i][j] === "player1"){
                if(gameArr[i][j+1] ==="player1"){
                    if(gameArr[i][j+2] ==="player1"){
                        if(gameArr[i][j+3] ==="player1"){
                            updateWinCounter();
                            showWinner();
                            verticalWinner(i,j);
                        }
                    }
                }
            }
            if(gameArr[i][j] === "player2"){
                if(gameArr[i][j+1] ==="player2"){
                    if(gameArr[i][j+2] ==="player2"){
                        if(gameArr[i][j+3] ==="player2"){
                            updateWinCounter();                           
                            showWinner();
                            verticalWinner(i,j);
                        }
                    }
                }
            }
        }
    }
}

const showWinner = () => {
    let winner = " ";
    if(gameDisplay.getAttribute("player") === "player1"){
        winner = "PLAYER 1";
        gameShadow.classList.add("pink");
    } else {
        winner = "PLAYER 2";
        gameShadow.classList.add("yellow");
    }
    const winnerLabel = document.querySelector(".game__win__winner");
    winnerLabel.textContent = winner;

    winMsg.classList.remove("hide");
    gameMain.classList.add("no-click");
}

const updateWinCounter = () => {
    if(gameDisplay.getAttribute("player") === "player1"){
        scorePlayer1 += 1;
        counterForP1.textContent = scorePlayer1;
    } 
    if(gameDisplay.getAttribute("player") === "player2"){
        scorePlayer2 +=1;
        counterForP2.textContent = scorePlayer2;
    }
}

const resetField = () => {
        //Reset Time.
        timeLeft = 30;
        remainingTime.textContent = 30;
        //Reset GameMap.
        for(const column in gameMap){
            for(const row in gameMap[column]){
                gameMap[column][row] = 0;
            }
        }
    
        //Reset Chips.
        let chipRows = document.querySelectorAll(".target-rows");
        chipRows.forEach(row => {
            row.innerHTML = " ";
        })

        //Reset shadow.
        gameShadow.classList.remove("pink");
        gameShadow.classList.remove("yellow");
}

const switchPlayer = () => {
    if(gameTimerBox.classList.contains("gametimer-pink")){
        gameTimerBox.classList.remove("gametimer-pink");
        gameTimerBox.classList.add("gametimer-yellow");
        gameTimerNum.textContent = "2"
        gameDisplay.setAttribute("player", "player2")
    } else {
        gameTimerBox.classList.add("gametimer-pink");
        gameTimerBox.classList.remove("gametimer-yellow");
        gameTimerNum.textContent = "1"
        gameDisplay.setAttribute("player", "player1")
    }
    
}

const switchTimer = () => {
    timeLeft = 30;
    remainingTime.textContent = 30;
}

//Show winning chips.

const horizontalWinner = (i, j) => {
    const chipMap = document.querySelector(".chip-map");
    const firstColumn = chipMap.querySelector(`#row${i+1}`);
    const firstRow = firstColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    const secondColumn = chipMap.querySelector(`#row${i+2}`);
    const secondRow = secondColumn.querySelector(`.target-rows > :nth-child(${j+1})`);
    
    const thirdColumn = chipMap.querySelector(`#row${i+3}`);
    const thirdRow = thirdColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    const fourthColumn = chipMap.querySelector(`#row${i+4}`);
    const fourthRow = fourthColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    
    firstRow.querySelector("div .marked-chip").classList.remove("hide");
    secondRow.querySelector("div .marked-chip").classList.remove("hide");
    thirdRow.querySelector("div .marked-chip").classList.remove("hide");
    fourthRow.querySelector("div .marked-chip").classList.remove("hide");
}

const verticalWinner = (i,j) => {
    const chipMap = document.querySelector(".chip-map");
    const firstColumn = chipMap.querySelector(`#row${i+1}`);
    const firstRow = firstColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    const secondColumn = chipMap.querySelector(`#row${i+1}`);
    const secondRow = secondColumn.querySelector(`.target-rows > :nth-child(${j+2})`);
    
    const thirdColumn = chipMap.querySelector(`#row${i+1}`);
    const thirdRow = thirdColumn.querySelector(`.target-rows > :nth-child(${j+3})`);

    const fourthColumn = chipMap.querySelector(`#row${i+1}`);
    const fourthRow = fourthColumn.querySelector(`.target-rows > :nth-child(${j+4})`);

    
    firstRow.querySelector("div .marked-chip").classList.remove("hide");
    secondRow.querySelector("div .marked-chip").classList.remove("hide");
    thirdRow.querySelector("div .marked-chip").classList.remove("hide");
    fourthRow.querySelector("div .marked-chip").classList.remove("hide");
}

const diagonalBottomTopWinner = (i,j) => {
    const chipMap = document.querySelector(".chip-map");
    const firstColumn = chipMap.querySelector(`#row${i+1}`);
    const firstRow = firstColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    const secondColumn = chipMap.querySelector(`#row${i+2}`);
    const secondRow = secondColumn.querySelector(`.target-rows > :nth-child(${j+2})`);
    
    const thirdColumn = chipMap.querySelector(`#row${i+3}`);
    const thirdRow = thirdColumn.querySelector(`.target-rows > :nth-child(${j+3})`);

    const fourthColumn = chipMap.querySelector(`#row${i+4}`);
    const fourthRow = fourthColumn.querySelector(`.target-rows > :nth-child(${j+4})`);

    
    firstRow.querySelector("div .marked-chip").classList.remove("hide");
    secondRow.querySelector("div .marked-chip").classList.remove("hide");
    thirdRow.querySelector("div .marked-chip").classList.remove("hide");
    fourthRow.querySelector("div .marked-chip").classList.remove("hide");
}

const diagonalTopBottomWinner = (i,j) => {
    const chipMap = document.querySelector(".chip-map");
    const firstColumn = chipMap.querySelector(`#row${i+1}`);
    const firstRow = firstColumn.querySelector(`.target-rows > :nth-child(${j+1})`);

    const secondColumn = chipMap.querySelector(`#row${i+2}`);
    const secondRow = secondColumn.querySelector(`.target-rows > :nth-child(${j})`);
    
    const thirdColumn = chipMap.querySelector(`#row${i+3}`);
    const thirdRow = thirdColumn.querySelector(`.target-rows > :nth-child(${j-1})`);

    const fourthColumn = chipMap.querySelector(`#row${i+4}`);
    const fourthRow = fourthColumn.querySelector(`.target-rows > :nth-child(${j-2})`);

    
    firstRow.querySelector("div .marked-chip").classList.remove("hide");
    secondRow.querySelector("div .marked-chip").classList.remove("hide");
    thirdRow.querySelector("div .marked-chip").classList.remove("hide");
    fourthRow.querySelector("div .marked-chip").classList.remove("hide");
}

