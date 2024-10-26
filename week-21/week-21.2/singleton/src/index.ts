import { GameManager } from "./store";
import { startLogger } from "./logger";
import { gameManager } from "./store";

startLogger();

setInterval(()=>{
    // games.push({
    //     id: Math.random().toString(),
    //     whitePlayerName: 'rakhshan',
    //     blackPlayerName: 'hassan',
    //     moves: [],
    // })
    let gameId = Math.random().toString();
    gameManager.addGame(gameId, 'rakhshan', 'hassan');
    gameManager.addMove(gameId, 'ae');
}, 5000);