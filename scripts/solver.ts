import { Board } from './board';
import { Move } from './move';

export class Solver {
    board: Board
    boards: Map<string, Move[]> = new Map<string, Move[]>();
    constructor(ballSort: Board) {
        this.board = ballSort
    }

    solve(currentMoves: Move[]): Move[] {
        let moves: Move[] = this.board.availableMoves();
        let state = this.board.toString();
        for(let move of moves){
            this.board.moveBall(move)
            if (this.board.entropy === 0){
                return [move];
            }else{
                let newMoves = currentMoves.concat(move)
                // We haven't see this before or the one we have was done in fewer moves
                if (!this.boards.has(this.board.toString())){
                    // this board hasn't been seen before
                    // Add it to seen boards
                    this.boards.set(this.board.toString(), newMoves);
                    let result = this.solve(newMoves)
                    if (result.length > 0){
                        result.push(move);
                        return result;
                    }
                }
                
            }
            // Set the board back to its original state
            this.board.load(state);
        }
        // Tried everything and didn't find anything new.
        return [];
    }
}