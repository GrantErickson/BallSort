import { Board } from '../board'
import { Move } from '../move'

export class BoardMove {
  board: Board
  move: Move
  previousMove: BoardMove | null

  constructor(board: Board, move: Move, previousMove: BoardMove | null) {
    this.board = board
    this.move = move
    this.previousMove = previousMove
  }

  getAllMoves(): Move[] {
    const moves: Move[] = []
    let boardMove: BoardMove | null = this
    while (boardMove != null) {
      moves.push(boardMove.move)
      boardMove = boardMove.previousMove
    }

    return moves
  }
}
