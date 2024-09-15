class GameRules {
  constructor(moves) {
    this.moves = moves;
  }
  determineWinner(userMove, computerMove) {
    const totalMoves = this.moves.length;
    const userIndex = this.moves.indexOf(userMove);
    const comIndex = this.moves.indexOf(computerMove);
    if (userIndex === comIndex) return "Draw";
    const half = Math.floor(totalMoves / 2);
    const diff = (comIndex - userIndex + totalMoves) % totalMoves;
    return diff <= half ? "Computer wins!" : "User wins!";
  }
}

module.exports = GameRules;
