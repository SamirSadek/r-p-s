const Game = require("./utils/Game");
const args = process.argv.slice(2);
try {
  const game = new Game(args);
  game.run();
} catch (error) {
  console.log(error.message);
  console.log("Example: node game.js rock paper scissors");
}
