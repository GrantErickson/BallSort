/**
 * @jest-environment node
 */

import { Stack } from '@/scripts/stack'

describe('Create Stack', () => {
  test('Has slots', () => {
    const stack = new Stack(3, 0)
    expect(stack.size).toBe(3)
  })
})

describe('Add/Remove to/from Stack', () => {
  const stack = new Stack(3, 0)
  test('Empty', () => {
    expect(stack.ballCount).toBe(0)
  })
  test('Add One', () => {
    stack.addBall('1')
    expect(stack.ballCount).toBe(1)
  })
  test('Add Another', () => {
    stack.addBall('2')
    expect(stack.ballCount).toBe(2)
  })
  test('Remove One', () => {
    const removedBall = stack.removeBall()
    expect(removedBall).toBe('2')
    expect(stack.ballCount).toBe(1)
  })
  test('Remove Another', () => {
    const removedBall = stack.removeBall()
    expect(removedBall).toBe('1')
    expect(stack.ballCount).toBe(0)
  })
})

describe('Stack toString', () => {
  const stack = new Stack(4, 0)
  test('Correct String', () => {
    expect(stack.toString()).toBe('    ')
    stack.addBall('1')
    expect(stack.toString()).toBe('   1')
    stack.addBall('A')
    expect(stack.toString()).toBe('  A1')
  })
  test('TopBall1', () => {
    expect(stack.topBall).toBe('A')
  })
  test('Can Recieve Ball', () => {
    expect(stack.canReceiveBall).toBe(true)
    stack.addBall('1')
    expect(stack.canReceiveBall).toBe(true)
    stack.addBall('B')
    expect(stack.canReceiveBall).toBe(false)
  })
  test('TopBall2', () => {
    expect(stack.topBall).toBe('B')
  })
  test('toString2', () => {
    expect(stack.toString()).toBe('B1A1')
  })
})

describe('Stack entropy', () => {
  const stack = new Stack(4, 0)
  test('Entropy', () => {
    expect(stack.entropy).toBeCloseTo(0)
    stack.addBall('1')
    stack.addBall('A')
    expect(stack.entropy).toBe(0.9)
    stack.removeBall()
    stack.addBall('1')
    stack.addBall('1')
    stack.addBall('1')
    expect(stack.entropy).toBe(0)
  })
})

describe('Stack Load', () => {
  const stack = new Stack(4, 0)
  stack.load('1234')
  test('Correct String', () => {
    expect(stack.toString()).toBe('1234')
  })
})

describe('CanGiveBallForReverse', () => {
  const stack = new Stack(4, 0)
  test('CanGiveBallForReverse', () => {
    stack.load('1234')
    expect(stack.canGiveBallForReverse).toBe(false)
    stack.load('    ')
    expect(stack.canGiveBallForReverse).toBe(false)
    stack.load('12  ')
    expect(stack.canGiveBallForReverse).toBe(false)
    stack.load('11 ')
    expect(stack.canGiveBallForReverse).toBe(true)
    stack.load('2222')
    expect(stack.canGiveBallForReverse).toBe(true)
    stack.load('1   ')
    expect(stack.canGiveBallForReverse).toBe(true)
  })
})

describe('Stack top number of same color', () => {
  test('same color count', () => {
    const stack = new Stack(4, 0)
    stack.load('1234')
    expect(stack.topBallsOfSameColor).toBe(1)
    stack.load('2244')
    expect(stack.topBallsOfSameColor).toBe(2)
    stack.load('4444')
    expect(stack.topBallsOfSameColor).toBe(4)
  })
})
