class GameRules {
  constructor(moves) {
    this.moves = moves;
  }
  determineWinner(userMove, computerMove) {
    const totalMoves = this.moves.length;
    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);

    if (userIndex === computerIndex) return "Draw";

    const half = Math.floor(totalMoves / 2);

    if (
      (computerIndex > userIndex && computerIndex - userIndex <= half) ||
      (userIndex > computerIndex && userIndex - computerIndex > half)
    ) {
      return "User wins!";
    } else {
      return "Computer wins!";
    }
  }
}

module.exports = GameRules;
