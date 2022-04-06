import { Stack } from './stack'
import { Move } from './move'

export class Board {
  readonly stackCount: number
  readonly stackSize: number
  readonly stacks: Stack[] = []
  readonly moves: Move[] = []

  constructor(
    stackCount: number,
    stackSize: number,
    board: string | null = null
  ) {
    this.stackCount = stackCount
    this.stackSize = stackSize
    for (let i = 0; i < stackCount; i++) {
      this.stacks.push(new Stack(stackSize, i))
    }
    if (board != null) {
      this.load(board)
    }
  }

  load(board: string) {
    for (let i = 0; i < board.length; i = i + this.stackSize) {
      const stack = this.stacks[i / this.stackSize]
      stack.load(board.substr(i, this.stackSize))
    }
  }

  public availableMoves(): Move[] {
    const result: Move[] = []
    for (const targetStack of this.stacks) {
      if (targetStack.canReceiveBall) {
        for (const sourceStack of this.stacks) {
          if (targetStack !== sourceStack && sourceStack.ballCount > 0) {
            if (
              targetStack.ballCount === 0 ||
              targetStack.topBall === sourceStack.topBall
            ) {
              result.push(new Move(sourceStack.index, targetStack.index))
            }
          }
        }
      }
    }
    return result
  }

  public availableReverseMoves(): Move[] {
    const result: Move[] = []
    for (const sourceStack of this.stacks.filter(
      (s) => s.canGiveBallForReverse
    )) {
      for (const targetStack of this.stacks) {
        if (
          targetStack !== sourceStack &&
          targetStack.ballCount < this.stackSize
        )
          if (sourceStack.ballCount > 1) {
            result.push(
              new Move(
                sourceStack.index,
                targetStack.index,
                Math.min(
                  sourceStack.topBallsOfSameColor - 1,
                  targetStack.availableSpaces
                )
              )
            )
          } else {
            result.push(new Move(sourceStack.index, targetStack.index, 1))
          }
      }
    }
    return result
  }

  public moveBall(move: Move) {
    this.stacks[move.toStack].addBall(this.stacks[move.fromStack].removeBall())
    this.moves.push(move)
  }

  public undoMove() {
    if (this.moves.length > 0) {
      const move = this.moves.pop()!
      this.stacks[move.fromStack].addBall(
        this.stacks[move.toStack].removeBall()
      )
    }
  }

  public toString(): string {
    let result: string = ''
    for (const stack of this.stacks) {
      result = result + stack.toString()
    }
    return result
  }

  get entropy(): number {
    let result = 0
    for (const stack of this.stacks) {
      result += stack.entropy
    }
    return result
  }

  get selectedStack(): Stack | null {
    const selecteds = this.stacks.filter((s) => s.selected)
    if (selecteds.length > 0) return selecteds[0]
    return null
  }

  attemptMove(stack: Stack) {
    if (this.selectedStack == null) {
      if (stack.ballCount !== 0) {
        stack.selected = true
      }
    } else if (this.selectedStack === stack) {
      stack.selected = false
    } else {
      let moveHappened: boolean = false
      if (
        stack.canReceiveBall &&
        (stack.ballCount === 0 || stack.topBall === this.selectedStack.topBall)
      ) {
        this.moveBall(new Move(this.selectedStack.index, stack.index))
        this.selectedStack.selected = false
        moveHappened = true
      }
      if (!moveHappened) {
        this.selectedStack.selected = false
        if (stack.ballCount !== 0) {
          stack.selected = true
        }
      }
    }
  }

  clone(): Board {
    const newBoard = new Board(this.stackCount, this.stackSize)
    newBoard.load(this.toString())

    return newBoard
  }

  clearHighlights(): void {
    for (const stack of this.stacks) {
      stack.highlightedFrom = false
      stack.highlightedTo = false
    }
  }

  // Randomize Columns
  randomizeStacks(): void {
    for (let i = 0; i < this.stackCount; i++) {
      const temp = this.stacks.splice(i,1)[0]
      const randomIndex = Math.floor(Math.random() * this.stacks.length)
      this.stacks.splice(randomIndex, 0, temp)
    }
  }
}
