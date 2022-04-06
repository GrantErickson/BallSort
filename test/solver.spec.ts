/**
 * @jest-environment node
 */

import { Board } from '@/scripts/board'
import { Solver } from '~/scripts/solver/solver'

describe('Solve Simple Board', () => {
  test('3 Columns', () => {
    const board = new Board(3, 2)
    board.load('1212  ')
    const solver = new Solver(board)
    const result = solver.solve()
    expect(result!.length).toBe(3)
  })
})

describe('Solve Medium Board', () => {
  test('5 Columns', () => {
    const board = new Board(5, 3)
    board.load('123   123123   ')
    const solver = new Solver(board)
    const result = solver.solve()
    expect(result!.length).toBe(9)
  })
})

describe('Solve Harder Board', () => {
  test('11 Columns', () => {
    const board = new Board(7, 4)
    board.load('VCCKKCTBCTVVVBKTBTBK        ')
    const solver = new Solver(board)
    const result = solver.solve()!
    expect(result.length).toBe(25)
    // expect(solver.boardsAttempted.size).toBe(1723)
  })
})

describe('Solve Hardest Board', () => {
  test('11 Columns', () => {
    const board = new Board(11, 4)
    board.load('VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        ')
    const solver = new Solver(board)
    const result = solver.solve()
    expect(result!.length).toBe(49)
  })
})
