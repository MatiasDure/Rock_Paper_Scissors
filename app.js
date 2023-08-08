//blueprint of play
class Play
{
    constructor(element, play, weakAgainst, strongAgainst)
    {
        this.element = element,
        this.play = play,
        this.weakAgainst = weakAgainst,
        this.strongAgainst = strongAgainst
    }
}

//information of plays to use
const playsInfo = [
    {
        play: "rock",
        weakAgainst: "paper",
        strongAgainst: "scissors"
    },
    {
        play: "paper",
        weakAgainst: "scissors",
        strongAgainst: "rock"
    },
    {
        play: "scissors",
        weakAgainst: "rock",
        strongAgainst: "paper"
    }
];

//get all play elements
const playElems = document.querySelectorAll(".play");

//array of Play objects
const plays = [];

//fill array with Play objects
for(let i = 0; i < playElems.length; i++)
{
    for(let j = 0; j < playsInfo.length; j++)
    {
        if(playElems[i].dataset.value !== playsInfo[j].play) continue;

        let currentPlayInfo = playsInfo[j];

        plays.push(new Play(playElems[i], 
                    currentPlayInfo.play,
                    currentPlayInfo.weakAgainst,
                    currentPlayInfo.strongAgainst));
    }
}

plays.forEach(play => play.element.addEventListener("click", () => PlayRound(play)));

//----------------------Game--------------------------
//game info 
const maxScore = 5;
let playerScore = 0;
let computerScore = 0;

function PlayRound(chosenPlay)
{
    let gameInfo = GameFinished();
    //someone already won
    if(gameInfo.end) return;

    let compPlay = ComputerDecision();
    
    UpdateChoiceUI(chosenPlay, compPlay);

    //Check winner
    CheckWinner(chosenPlay, compPlay);

    gameInfo = GameFinished();
    //Restart pop up
    if(gameInfo.end)
    {
        EnableRestart();
        gameOutcome.innerHTML = gameInfo.info; 
    } 
}

function CheckWinner(playerChoice, computerChoice)
{
    let won = false;
    let tied = false;

    switch(computerChoice.play)
    {
        case playerChoice.play:
            //tied
            tied = true;
            break;
        case playerChoice.strongAgainst:
            //player won
            won = true;
            playerScore++;
            break;
        default:
            //player lost
            computerScore++;
            break;
    }

    UpdateScoreUI();
}

function ComputerDecision()
{
    //random number between 0 and the amount of plays
    let ranNum = Math.floor(Math.random() * plays.length);

    return plays[ranNum];
}

function GameFinished() 
{
    let msg = "";
    let finished = false;

    if(playerScore >= maxScore)
    {
        msg = "You Won";
        finished = true;
    } 
    else if(computerScore >= maxScore)
    {
        msg = "You Lost";
        finished = true;
    } 

    return { end: finished, info: msg };
}

//-------------Restart--------------

const restartPopUp = document.querySelector(".popUp-screen");
const restartBtn = document.querySelector(".popUp-screen button");
restartBtn.addEventListener("click", Restart);
const gameOutcome = document.querySelector(".popUp-box h1");

function EnableRestart()
{
    restartPopUp.classList.remove("hidden");
}

function Restart()
{
    playerScore = 0;
    computerScore = 0;
    UpdateScoreUI();
    RestartChoiceUI();
    restartPopUp.classList.add("hidden");
}

//-----------------UI--------------------
const playerScoreUI = document.querySelector(".player-score");
const computerScoreUI = document.querySelector(".computer-score");
const playerChoiceImg = document.querySelector("div.player img");
const computerChoiceImg = document.querySelector("div.computer img");
const imgPath = "./images/";
const resetImgPath = imgPath + "question.png";

function UpdateScoreUI()
{
    playerScoreUI.innerHTML = playerScore;
    computerScoreUI.innerHTML = computerScore;
}

function UpdateChoiceUI(playerChoice, computerChoice)
{
    playerChoiceImg.src = imgPath + playerChoice.play + ".png";
    computerChoiceImg.src = imgPath + computerChoice.play + ".png";
}

function RestartChoiceUI()
{
    playerChoiceImg.src = resetImgPath;
    computerChoiceImg.src = resetImgPath;
}