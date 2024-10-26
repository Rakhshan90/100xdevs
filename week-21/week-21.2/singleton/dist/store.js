"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = exports.GameManager = void 0;
class GameManager {
    constructor() {
        this.games = [];
        this.games = [];
    }
    addMove(gameId, move) {
        const game = this.games.find(game => game.id === gameId);
        game === null || game === void 0 ? void 0 : game.moves.push(move);
    }
    addGame(gameId, whitePlayerName, blackPlayerName) {
        this.games.push({
            id: gameId,
            whitePlayerName,
            blackPlayerName,
            moves: [],
        });
    }
}
exports.GameManager = GameManager;
exports.gameManager = new GameManager();
