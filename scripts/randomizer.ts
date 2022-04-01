import { Board } from './board'
import { Move } from './move'

export abstract class Randomizer {
  static ballNames: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  static getGame(balls: number, stackSize: number, openStacks: number): Board {
    let board = new Board(balls + openStacks, stackSize)
    // Create the board with ending game
    for (let i = 0; i < balls; i++) {
      for (let s = 0; s < stackSize; s++) {
        board.stacks[i].addBall(this.ballNames[i])
      }
    }

    // Remember all the old boards
    let boards = new Map<string, Board>()
    boards.set(board.toString(), board)

    // Randomize the board
    let count = 0
    let moves = board.availableReverseMoves().sort((a, b) => b.count - a.count)
    while (count < 1000 && moves.length > 0) {
      let existingBoard = board.clone()
      let moveMade: boolean = false
      for (let move of moves) {
        if (Math.random() > 0.4) {
          for (let i = 0; i < move.count; i++) {
            board.moveBall(move)
          }
          if (!boards.has(board.toString())) {
            boards.set(board.toString(), board)
            moveMade = true
            break
          }
          board = existingBoard.clone()
        }
      }
      if (!moveMade) break // There are no more moves
      moves = board.availableReverseMoves().sort((a, b) => b.count - a.count)
      count++
    }
    console.log(`Randomized board with ${count} moves`)
    let bestBoard = board
    let bestBoardEntropy = bestBoard.entropy
    for (let b of Array.from(boards, ([key, value]) => value)) {
      if (b.entropy > bestBoardEntropy) {
        bestBoard = b
        bestBoardEntropy = b.entropy
      }
    }

    bestBoard.randomizeStacks()
    return bestBoard
  }

  static getGameBreadth(
    balls: number,
    stackSize: number,
    openStacks: number,
    maxIterations: number = 100
  ): Board {
    let board = new Board(balls + openStacks, stackSize)
    // Create the board with ending game
    for (let i = 0; i < balls; i++) {
      for (let s = 0; s < stackSize; s++) {
        board.stacks[i].addBall(this.ballNames[i])
      }
    }

    // Remember all the old boards
    let boards = new Map<string, Board>()
    boards.set(board.toString(), board)

    // Randomize the board
    // Get available moves for the starting board
    let movesToTry: BoardMove[] = board
      .availableReverseMoves()
      .map((f) => new BoardMove(board.clone(), f, null))!
    // Order them by the number of moves
    movesToTry.sort((a, b) => b.move.count - a.move.count)

    let count = 0
    while (movesToTry.length > 0 && count < maxIterations) {
      // Get the next move
      let boardMove = movesToTry.shift()!
      // Make the moves
      for (let i = 0; i < boardMove.move.count; i++) {
        boardMove.board.moveBall(boardMove.move)
      }
      // See if this is unique
      if (!boards.has(boardMove.board.toString())) {
        // Add to the list of boards
        boards.set(boardMove.board.toString(), boardMove.board)
        movesToTry = movesToTry.concat(
          boardMove.board
            .availableReverseMoves()
            .map((f) => new BoardMove(boardMove.board.clone(), f, boardMove))!
        )
      }
      movesToTry.sort((a, b) => b.move.count - a.move.count)

      //   if (movesToTry.length % (Math.floor(Math.random() * 50) + 5) == 0) {
      //     console.log(`Sorting moves: ${movesToTry.length}`)
      //     // Sort boards based on Entropy
      //     movesToTry.sort((a, b) => {
      //       return b.board.entropy - a.board.entropy
      //     })
      //   }
      count++
    }
    console.log(`Randomized board with ${count} moves`)
    let bestBoard = board
    let bestBoardEntropy = bestBoard.entropy
    for (let b of Array.from(boards, ([key, value]) => value)) {
      if (b.entropy > bestBoardEntropy) {
        bestBoard = b
        bestBoardEntropy = b.entropy
      }
    }
    bestBoard.randomizeStacks()
    return bestBoard
  }
}

class BoardMove {
  board: Board
  move: Move
  previousMove: BoardMove | null

  constructor(board: Board, move: Move, previousMove: BoardMove | null) {
    this.board = board
    this.move = move
    this.previousMove = previousMove
  }
}
