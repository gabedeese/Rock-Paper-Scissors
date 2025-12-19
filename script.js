// Get the computer's random choice
function getComputerChoice() {
  // Get a random float between 0-1 and declare computerChoice to be used later
  const getRandom = Math.random();
  let computerChoice;

  // Switch case to take the random number returned and apply a R-P-S value to it
  switch (true) {
    case getRandom <= 0.33:
      computerChoice = "rock";
      break;
    case getRandom > 0.33 && getRandom <= 0.66:
      computerChoice = "paper";
      break;
    case getRandom > 0.66 && getRandom <= 1:
      computerChoice = "scissors";
      break;

  }
  // Return the string given as the computerChoice
  return computerChoice;
}

// Prompt the user for their input of R-P-S
function getUserChoice() {
  const userInput = prompt("Choose: Rock/Paper/Scissors");
  const userChoice = userInput.toLowerCase(); // Needed to handle case sensitive situations
  return userChoice;
}

// This function to play the round will have to be broken up into 4 sections
// to calculate the winner. Each choice the user makes has a win-lose-tie.
function playRound(userChoice, computerChoice) {
  let roundWinner;

  // Get the tie out of the way since it is the easiest to process
  if (userChoice === computerChoice) {
    console.log("Tie!");
    roundWinner = "Both";
  }

  // All conditions that the user wins
  else if (
  (userChoice === "rock" && computerChoice === "scissors") ||
  (userChoice === "paper" && computerChoice === "rock") ||
  (userChoice === "scissors" && computerChoice === "paper")
  ){
    console.log("You win! " + userChoice.charAt(0).toUpperCase() + userChoice.slice(1) + 
    " beats " + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) + ".");

    return "User";
  }

  // If it's not a tie and the user didn't win then that means the computer won
  else {
    console.log("You lose! " + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) + 
    " beats " + userChoice.charAt(0).toUpperCase() + userChoice.slice(1) + ".");

    return "Computer";
  }
}

// Function to modify the DOM with post round stats and next round button
function postRound(message) {

  // Disable all the other buttons
  rock.disabled = true;
  paper.disabled = true;
  scissors.disabled = true;

  const div = document.createElement("div");
  div.textContent = `${message} You: ${userScore} | Computer: ${computerScore}`;
  div.setAttribute("style", "margin-top: 16px;");
 
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Next Round";
  playAgainButton.setAttribute("style", "margin-left: 16px;");

  div.appendChild(playAgainButton);
  document.body.appendChild(div);

  playAgainButton.addEventListener("click", () => {
    div.remove();
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
  });
}

// Largely the same as postRound() but adds play again to the button and
// resets all stats after the play again button is clicked (reloads the page)
function postGame(message) {

  // Disable all the other buttons
  rock.disabled = true;
  paper.disabled = true;
  scissors.disabled = true;

  const div = document.createElement("div");
  div.textContent = `${message} You: ${userScore} | Computer: ${computerScore}`;
  div.setAttribute("style", "margin-top: 16px;");

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again!";
  playAgainButton.setAttribute("style", "margin-left: 16px;");

  div.appendChild(playAgainButton);
  document.body.appendChild(div);

  playAgainButton.addEventListener("click", () => {
    location.reload();
  });
}

function displayWinner(userChoice) {
  roundCount++;
  const computerChoice = getComputerChoice();
  const winner = playRound(userChoice, computerChoice);

  if (winner === "User") {
    userScore++;

    if (roundCount < 5) {
      postRound("You win this round! The score is");
    }
    else {
      if (userScore > computerScore) {
        postGame("You won the game! The final score is");
      }
      else if (userScore < computerScore) {
        postGame("You lost the game... The final score is");
      }
      else {
        postGame("You tied the game! The final score is");
      }
    }
  }

  else {
    computerScore++;

    if (roundCount < 5) {
      postRound("You lost this round! The score is");
    }
    else {
      if (userScore > computerScore) {
        postGame("You won the game! The final score is");
      }
      else if (userScore < computerScore) {
        postGame("You lost the game... The final score is");
      }
      else {
        postGame("You tied the game! The final score is");
      }
    }
  }
}

// Declare the variables to hold the scores
let userScore = 0;
let computerScore = 0;
let roundCount = 0;

// Declare each button to be used later in eventListener
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

rock.addEventListener("click", () => {
  displayWinner("rock");
});
paper.addEventListener("click", () => {
  displayWinner("paper");
});
scissors.addEventListener("click", () => {
  displayWinner("scissors");
});
