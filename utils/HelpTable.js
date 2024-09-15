const chalk = require("chalk");
const Table = require("cli-table3");
class HelpTable {
  constructor(moves, gameRules) {
    this.moves = moves;
    this.gameRules = gameRules;
  }
  generateHelpTable() {
    const n = this.moves.length;
    const table = new Table({
      head: [
        chalk.bgGreen.white.bold(" v PC\\User > "), 
        ...this.moves.map(move => chalk.white.bold(move))
      ],
      style: {
        head: ['green'],
        border: ['gray']
      }
    });
    for (let i = 0; i < n; i++) {
      const row = [chalk.bold(this.moves[i])];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          row.push(chalk.cyan("Draw"));
        } else {
          const result = this.gameRules.determineWinner(this.moves[j], this.moves[i]);
          row.push(result === "User wins!" ? chalk.green("Win") : chalk.red("Lose"));
        }
      }
      table.push(row);
    }
    const explanation = 
      "Table below shows results from the user's point of view:\n" +
      "Win means the user wins, Lose means the user loses, and Draw means it's a tie.\n" +
      "Example: If the computer chooses Rock and you choose Paper, the result will be 'Win' for you.\n\n";
    return explanation + table.toString();
  }
}

module.exports = HelpTable;
