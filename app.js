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

//game info 
const maxScore = 5;
let playerScore = 0;
let computerScore = 0;

function PlayRound(chosenPlay)
{
    //someone already won
    if(playerScore >= maxScore || ComputerScore >= maxScore) return;

    // console.log(chosenPlay);

    //pc choice
    let compPlay = ComputerDecision();

    //Check winner
    CheckWinner(chosenPlay, compPlay);
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
            console.log("Tie!");
            break;
        case playerChoice.strongAgainst:
            //won
            won = true;
            console.log("Won!");
            playerScore++;
            break;
        default:
            //lost
            console.log("Lost!");
            computerScore++;
            break;
    }

    //update ui
}

function ComputerDecision()
{
    //random number between 0 and the amount of plays
    let ranNum = Math.floor(Math.random() * plays.length);

    return plays[ranNum];
}