"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
(0, logger_1.startLogger)();
setInterval(() => {
    // games.push({
    //     id: Math.random().toString(),
    //     whitePlayerName: 'rakhshan',
    //     blackPlayerName: 'hassan',
    //     moves: [],
    // })
    let gameId = Math.random().toString();
    store_1.gameManager.addGame(gameId, 'rakhshan', 'hassan');
    store_1.gameManager.addMove(gameId, 'ae');
}, 5000);
