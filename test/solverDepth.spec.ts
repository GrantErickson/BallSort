/**
* @jest-environment node
*/

import { Board } from '@/scripts/board'
import { SolverDepth } from '@/scripts/solverDepth'

describe('Solve Simple Board', () => {
  test('3 Columns', () => {
    const board = new Board(3, 2);
    board.load("1212  ");
    const solver = new SolverDepth(board)
    const result = solver.solve([]);
    expect(solver.board.entropy).toBe(0);
    expect(result.length).toBe(3)
  })
})


describe('Solve Medium Board', () => {
  test('5 Columns', () => {
    const board = new Board(5, 3, '123   123123   ')
    const solver = new SolverDepth(board)
    solver.solve([])
    expect(solver.board.entropy).toBe(0);
  })
})

describe('Solve Hard Board', () => {
  test('11 Columns', () => {
    const board = new Board(11, 4, 'VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        ')
    const solver = new SolverDepth(board)
    const result = solver.solve([]);
    expect(solver.board.entropy).toBe(0);
    expect(result.length).toBe(311)  
  })
})
