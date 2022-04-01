/**
 * @jest-environment node
 */

import { Board } from '@/scripts/board'
import { Randomizer } from '@/scripts/randomizer'

describe('Randomize Simple Board', () => {
  test('3 Stacks', () => {
    let board = Randomizer.getGameBreadth(2, 2, 1)
    expect(board.stacks.length).toBe(3)
  })
})

describe('Randomize Simple Board Breadth', () => {
  test('3 Stacks', () => {
    let board = Randomizer.getGame(2, 2, 1)
    expect(board.stacks.length).toBe(3)
  })
})
