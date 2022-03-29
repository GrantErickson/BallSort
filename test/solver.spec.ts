/**
* @jest-environment node
*/

import { Board } from '@/scripts/board'
import { Solver } from '@/scripts/solver'

describe('Solve Simple Board', () => {
  test('3 Columns', () => {
    let board = new Board(3, 2);
    board.load("1212  ");
    let solver = new Solver(board);
    let result = solver.solve([]);
    expect(solver.board.entropy).toBe(0);
    expect(result.length).toBe(3)
  })
})


describe('Solve Medium Board', () => {
  test('4 Columns', () => {
    let board = new Board(5, 3);
    board.load("123123123      ");
    let solver = new Solver(board);
    let result = solver.solve([]);
    expect(solver.board.entropy).toBe(0);
  })
})

describe('Solve Hard Board', () => {
  test('11 Columns', () => {
    let board = new Board(11, 4);
    board.load("VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        ");
    let solver = new Solver(board);
    let result = solver.solve([]);
    expect(solver.board.entropy).toBe(0);
    expect(result.length).toBe(311)  
  })
})
