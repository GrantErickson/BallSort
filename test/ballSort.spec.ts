import { BallSort } from '~/scripts/ballSort'

describe('Create Game', () => {
  let game= new BallSort(3, 3);
  test('Has slots', () => {
    expect(game.stackCount).toBe(3)
  })
})
