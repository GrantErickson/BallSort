/**
 * @jest-environment node
 */

import { Board } from '~/scripts/board'

describe('Create Game', () => {
  let game = new Board(3, 3)
  test('Has slots', () => {
    expect(game.stackCount).toBe(3)
  })
})

describe('Test Game', () => {
  let game = new Board(3, 3)
  game.stacks[0].addBall('A')
  game.stacks[0].addBall('B')
  game.stacks[2].addBall('B')
  game.stacks[2].addBall('A')
  game.stacks[2].addBall('C')
  test('Test String', () => {
    expect(game.toString()).toBe(' BA   CAB')
  })
  test('Test Available Moves', () => {
    expect(game.availableMoves().length).toBe(2)
    game.stacks[2].removeBall()
    game.stacks[2].addBall('B')
    expect(game.availableMoves().length).toBe(3)
    game.stacks[1].addBall('A')
    expect(game.availableMoves().length).toBe(1)
    expect(game.availableMoves()[0].fromStack).toBe(2)
    expect(game.availableMoves()[0].toStack).toBe(0)
  })
})

describe('Board Load', () => {
  let board = new Board(5, 4)
  board.load('1234432112344321    ')
  test('Correct String', () => {
    expect(board.stacks[0].toString()).toBe('1234')
    expect(board.stacks[1].toString()).toBe('4321')
    expect(board.stacks[2].toString()).toBe('1234')
    expect(board.stacks[3].toString()).toBe('4321')
    expect(board.stacks[4].toString()).toBe('    ')
  })
})

describe('Board Load', () => {
  let board = new Board(4, 4)
  board.load('111122223333    ')
  test('Correct solved Entropy', () => {
    expect(board.entropy).toBe(0)
  })
})
