const chalk = require("chalk");

class HelpTable {
  constructor(moves, gameRules) {
    this.moves = moves;
    this.gameRules = gameRules;
  }

  generateHelpTable() {
    const n = this.moves.length;
    let table = chalk.green(
      " Table below shows results from the user's point of view:\n"
    );
    table +=
      "Win means the user wins, Lose means the user loses, and Draw means it's a tie.\n\n";

    table += "+-------------+";
    for (let i = 0; i < n; i++) {
      table += " " + this.moves[i].padEnd(6) + " +";
    }
    table += "\n| v PC\\User > |";

    for (let i = 0; i < n; i++) {
      table += " " + chalk.bold(this.moves[i].padEnd(6)) + " |";
    }
    table += "\n+-------------+";
    for (let i = 0; i < n; i++) {
      table += "-------+";
    }
    table += "\n";

    for (let i = 0; i < n; i++) {
      table += "| " + chalk.bold(this.moves[i].padEnd(11)) + "|";
      for (let j = 0; j < n; j++) {
        if (i === j) {
          table += " " + chalk.cyan("Draw".padEnd(6)) + " |";
        } else {
          const result = this.gameRules.determineWinner(
            this.moves[i],
            this.moves[j]
          );
          if (result === "User wins!") {
            table += " " + chalk.green("Win".padEnd(6)) + " |";
          } else {
            table += " " + chalk.red("Lose".padEnd(6)) + " |";
          }
        }
      }
      table += "\n+-------------+";
      for (let i = 0; i < n; i++) {
        table += "-------+";
      }
      table += "\n";
    }

    return table;
   
  }
}

module.exports = HelpTable;
