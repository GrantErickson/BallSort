export class Stack {
  balls: string[] = []
  index: number
  selected: boolean = false
  highlightedFrom: boolean = false
  highlightedTo: boolean = false
  readonly size: number

  constructor(size: number, index: number) {
    this.size = size
    this.index = index
  }

  load(balls: string) {
    if (balls.length > this.size) {
      throw new Error('Too many balls')
    }
    this.balls = []
    for (const ball of balls.split('').reverse().join('')) {
      this.addBall(ball)
    }
  }

  get ballCount(): number {
    return this.balls.length
  }

  get entropy(): number {
    // Calculate entropy of this stack
    // Full of the name type is 0
    // Empty is 0
    // Each different ball going down increases entropy by .5
    // Each blank spot increases entropy by .2
    if (this.balls.length === 0) return 0
    let result = (this.size - this.balls.length) * 0.2
    let lastBall = null
    for (let i = this.balls.length - 1; i >= 0; i--) {
      if (lastBall == null) {
        lastBall = this.balls[i]
      } else if (lastBall !== this.balls[i]) {
        result += 0.5
        lastBall = this.balls[i]
      }
    }
    return result
  }

  addBall(ball: string) {
    if (ball === ' ') return
    if (this.balls.length < this.size) {
      this.balls.push(ball)
    } else {
      throw new Error('Stack is full')
    }
  }

  removeBall(): string {
    if (this.balls.length > 0) {
      return this.balls.pop() as string
    } else {
      throw new Error('Stack is empty')
    }
  }

  toString(): string {
    let result: string = ''
    for (const b of this.balls) {
      result = b + result
    }
    result = result.padStart(this.size, ' ')
    return result
  }

  get canReceiveBall(): boolean {
    return this.balls.length < this.size
  }

  get canGiveBallForReverse(): boolean {
    // Either there is only one ball or the top two balls are the same color.
    return (
      this.balls.length === 1 ||
      (this.balls.length > 0 &&
        this.balls[this.balls.length - 1] === this.balls[this.balls.length - 2])
    )
  }

  get topBall(): string | null {
    if (this.balls.length === 0) return null
    return this.balls[this.balls.length - 1]
  }

  get availableSpaces(): number {
    return this.size - this.balls.length
  }

  get topBallsOfSameColor(): number {
    if (this.balls.length === 0) return 0
    let result = 1
    const originalBall = this.balls[this.balls.length - 1]
    for (let i = this.balls.length - 2; i >= 0; i--) {
      if (this.balls[i] === originalBall) {
        result++
      } else {
        break
      }
    }
    return result
  }
}
