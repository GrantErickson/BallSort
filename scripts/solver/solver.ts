import { Board } from '../board'
import { Move } from '../move'
import { BoardMove } from './boardMove'

export class Solver {
  board: Board
  boardsAttempted: Map<string, BoardMove | null> = new Map<string, BoardMove>()
  movesToAttempt: BoardMove[] = []

  constructor(ballSort: Board) {
    this.board = ballSort
  }

  solve(): Move[] | null {
    // Is board solved? If so return an empty array
    if (this.board.entropy === 0) return []
    // Add original board to boards attempted
    this.boardsAttempted.set(this.board.toString(), null)
    // Push the first attempts onto the list
    for (const move of this.board.availableMoves()) {
      this.movesToAttempt.push(new BoardMove(this.board.clone(), move, null))
    }
    // Start processing the boards
    while (this.movesToAttempt.length > 0) {
      // Remove first item from array
      const boardMove = this.movesToAttempt.shift()!
      // console.log(`Attempting ${boardMove.move.fromStack} to ${boardMove.move.toStack} with ${boardMove.board.toString()}`)
      // Make the move
      boardMove.board.moveBall(boardMove.move)
      // Check if we've seen this board before
      if (!this.boardsAttempted.has(boardMove.board.toString())) {
        // Add the board to the list of attempted boards
        this.boardsAttempted.set(boardMove.board.toString(), boardMove)
        // Check if the board is solved
        if (boardMove.board.entropy === 0) {
          // This is solved
          return boardMove.getAllMoves()
        } else {
          // Add the new moves to the list
          for (const move of boardMove.board.availableMoves()) {
            this.movesToAttempt.push(
              new BoardMove(boardMove.board.clone(), move, boardMove)
            )
          }
          // Only sort the boards periodically
          if (this.movesToAttempt.length % 20 === 0) {
            // Sort boards based on Entropy
            this.movesToAttempt.sort((a, b) => {
              return a.board.entropy - b.board.entropy
            })
          }
        }
      }
    }
    return null
  }

  isSolvable(): boolean {
    return this.solve() != null
  }
}
