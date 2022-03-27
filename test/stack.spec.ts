import { Stack } from '@/scripts/stack'

describe('Create Stack', () => {
  test('Has slots', () => {
    let stack = new Stack(3)
    expect(stack.size).toBe(3)
  })
})

describe('Add/Remove to/from Stack', () => {
  // let t = []
  // t.push(1);
  // expect(t.length).toBe(1);
  // t.push(2);
  // expect(t.length).toBe(2);
  // t.pop()
  // expect(t.length).toBe(1);
  // t.pop()
  // expect(t.length).toBe(0);
  

  let stack = new Stack(3)
  test('Empty', () => {
    expect(stack.ballCount).toBe(0)
  }),
  test('Add One', () => {
    stack.addBall(1);
    expect(stack.ballCount).toBe(1)
  }),
  test('Add Another', () => {
    stack.addBall(2);
    expect(stack.ballCount).toBe(2)
  }),
  test('Remove One', () => {
    let removedBall = stack.removeBall();
    expect(removedBall).toBe(2)
    expect(stack.ballCount).toBe(1)
  })
  test('Remove Another', () => {
    let removedBall = stack.removeBall();
    expect(removedBall).toBe(1)
    expect(stack.ballCount).toBe(0)
  })

})

