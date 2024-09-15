const HMACGenerator = require("./HmacGenerator");
const GameRules = require("./GameRules");
const HelpTable = require("./HelpTable");

class Game {
  constructor(moves) {
    if (moves.length % 2 === 0 || moves.length < 3 || new Set(moves).size !== moves.length) {
      throw new Error("Provide an odd number of non-repeating moves (at least 3).");
    }
    this.moves = moves;
    this.hmacGenerator = new HMACGenerator();
    this.gameRules = new GameRules(moves);
    this.helpTable = new HelpTable(moves, this.gameRules);
  }

  run() {
    const computerMove = this.getComputerMove();
    console.log("HMAC:", this.hmacGenerator.generateHMAC(computerMove));
    console.log("Available moves:");
    this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
    console.log("0 - exit\n? - help\nEnter Your Move :");
    process.stdin.on("data", (input) => {
      const choice = input.toString().trim();
      if (choice === "0") {
        console.log("Exiting...");
        process.exit();
      }
      if (choice === "?") {
        console.log(this.helpTable.generateHelpTable());
        return;
      }
      const userChoice = parseInt(choice, 10);
      if (isNaN(userChoice) || userChoice < 1 || userChoice > this.moves.length) {
        console.log("Invalid input. Please try again.");
        return;
      }
      const userMove = this.moves[userChoice - 1];
      console.log(`Your move: ${userMove}\nComputer move: ${computerMove}`);
      console.log(this.gameRules.determineWinner(userMove, computerMove));
      console.log("HMAC key:", this.hmacGenerator.getKey());
      process.exit();
    });
  }
  getComputerMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }
}
module.exports = Game;
