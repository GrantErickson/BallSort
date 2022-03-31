/**
 * @jest-environment node
 */

import { Board } from '@/scripts/board'
import { Solver } from '@/scripts/solver'

describe('Solve Simple Board', () => {
  test('3 Columns', () => {
    let board = new Board(3, 2)
    board.load('1212  ')
    let solver = new Solver(board)
    let result = solver.solve()
    expect(result!.length).toBe(3)
  })
})

describe('Solve Medium Board', () => {
  test('5 Columns', () => {
    let board = new Board(5, 3)
    board.load('123   123123   ')
    let solver = new Solver(board)
    let result = solver.solve()
    expect(result!.length).toBe(8)
  })
})

describe('Solve Harder Board', () => {
  test('11 Columns', () => {
    let board = new Board(7, 4)
    board.load('VCCKKCTBCTVVVBKTBTBK        ')
    let solver = new Solver(board)
    let result = solver.solve()!
    expect(result.length).toBe(16)
    expect(solver.boardsAttempted.size).toBe(16)
  })
})


// describe('Solve Hard Board', () => {
//   test('11 Columns', () => {
//     let board = new Board(11, 4);
//     board.load("VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        ");
//     let solver = new Solver(board);
//     let result = solver.solve();
//     expect(result!.length).toBe(8)

//   })
// })
