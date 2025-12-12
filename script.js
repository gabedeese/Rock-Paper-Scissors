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

// Declare the variables to hold the scores
let userScore = 0;
let computerScore = 0;

// Now we start a loop to play 5 rounds and then calculate the winner at the end
for (let i = 0; i < 5; i++) {
  // First get the user's input then get a random computer choice
  let userChoice = getUserChoice();
  let computerChoice = getComputerChoice();

  // Play the round and assign the winner to a variable
  let winner = playRound(userChoice, computerChoice);

  // Adjust the score of the winner
  if (winner === "User") {
    userScore++;
  }
  else if (winner === "Computer") {
    computerScore++;
  }

  // Update the player on the scores for better readability
  console.log("You: " + userScore + "\nComputer: " + computerScore);
}

// After the 5 rounds are up, see who is the winner for the game
if (userScore > computerScore) {
  console.log("You win the game!!!")
}
else if (userScore < computerScore) {
  console.log("Computer wins the game!!!")
}
else {
  console.log("Wow! It's a tie!");
}
