import { Board } from './board'
import { Move } from './move'

export abstract class Randomizer {

    static ballNames: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    static getGame(balls: number, stackSize: number, openStacks: number): Board {
        let board = new Board(balls + openStacks, stackSize);
        // Create the board with ending game
        for (let i = 0; i < balls; i++) {
            for (let s = 0; s < stackSize; s++) {
                board.stacks[i].addBall(this.ballNames[i]);
            }
        }

        // Remember all the old boards
        let boards = new Map<string, Board>();
        boards.set(board.toString(), board);

        // Randomize the board
        let count = 0;
        let moves = board.availableReverseMoves();
        while (count < 1000 && moves.length > 0) {
            let existingBoard = board.clone()
            let moveMade: boolean = false
            for(let move of moves){
                board.moveBall(move);
                if (!boards.has(board.toString())){
                    boards.set(board.toString(), board)
                    moveMade = true;
                    break;
                }
                board = existingBoard.clone();
            }
            if (!moveMade) break; // There are no more moves
            moves = board.availableReverseMoves();
            count++;
        }
        console.log(`Randomized board with ${count} moves`);
        let bestBoard = board
        let bestBoardEntropy = bestBoard.entropy
        for(let b of Array.from(boards, ([key, value]) => value)){
            if (b.entropy > bestBoardEntropy){
                bestBoard = b;
                bestBoardEntropy = b.entropy;
            }
        }
        return bestBoard;
    }

}
