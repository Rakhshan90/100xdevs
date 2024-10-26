
interface Game{
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

export class GameManager {
    games: Game[] = [];
    private static instance: GameManager;
    private constructor(){
        this.games = [];
    }

    static getInstance(){
        // create a single instance and return it
        if(GameManager.instance){
            return GameManager.instance;
        }
        else{
            GameManager.instance = new GameManager();
            return GameManager.instance;
        }
    }

    addMove(gameId: string, move: string){
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move);
    }

    addGame(gameId: string, whitePlayerName: string,  blackPlayerName: string){
        this.games.push({
            id: gameId,
            whitePlayerName,
            blackPlayerName,
            moves: [],
        })
    }
}


export const gameManager = GameManager.getInstance();