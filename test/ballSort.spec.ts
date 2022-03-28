/**
* @jest-environment node
*/

import { BallSort } from '~/scripts/ballSort'

describe('Create Game', () => {
  let game = new BallSort(3, 3);
  test('Has slots', () => {
    expect(game.stackCount).toBe(3)
  })
})

describe('Test Game', () => {
  let game = new BallSort(3, 3);
  game.stacks[0].addBall("A");
  game.stacks[0].addBall("B");
  game.stacks[2].addBall("B");
  game.stacks[2].addBall("A");
  game.stacks[2].addBall("C");
  test('Test String', () => {
    expect(game.toString()).toBe(" BA   CAB")
  })
  test('Test Available Moves', () => {
    expect(game.availableMoves().length).toBe(2);
    game.stacks[2].removeBall();
    game.stacks[2].addBall("B");
    expect(game.availableMoves().length).toBe(3);
    game.stacks[1].addBall("A");
    expect(game.availableMoves().length).toBe(1);
    expect(game.availableMoves()[0].fromStack).toBe(game.stacks[2]);
    expect(game.availableMoves()[0].toStack).toBe(game.stacks[0]);
  })
})
