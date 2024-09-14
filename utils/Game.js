const HMACGenerator = require("./HmacGenerator");
const GameRules = require("./GameRules");
const HelpTable = require("./HelpTable");

class Game {
  constructor(moves) {
    if (moves.length % 2 === 0 || moves.length < 3) {
      throw new Error(
        "Provide an odd number of non-repeating moves (at least 3)."
      );
    }
    const uniqueMoves = new Set(moves);
    if (uniqueMoves.size !== moves.length) {
      throw new Error("Moves must be unique.");
    }
    this.moves = moves;
    this.hmacGenerator = new HMACGenerator();
    this.gameRules = new GameRules(moves);
    this.helpTable = new HelpTable(moves, this.gameRules);
  }
  run() {
    const computerMove = this.getComputerMove();
    const hmac = this.hmacGenerator.generateHMAC(computerMove);

    console.log("HMAC:", hmac);
    console.log("Available moves:");
    this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
    console.log("0 - exit");
    console.log("? - help");
    console.log("Enter Your Move :");

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

      const userChoice = parseInt(choice);
      if (
        isNaN(userChoice) ||
        userChoice < 1 ||
        userChoice > this.moves.length
      ) {
        console.log("Invalid input. Please try again.");
        return;
      }

      const userMove = this.moves[userChoice - 1];
      console.log("Your move:", userMove);
      console.log("Computer move:", computerMove);

      const result = this.gameRules.determineWinner(userMove, computerMove);
      console.log(result);
      console.log("HMAC key:", this.hmacGenerator.getKey());

      process.exit();
    });
  }
  getComputerMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }
}

module.exports = Game;
