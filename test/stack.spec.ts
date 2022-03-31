/**
* @jest-environment node
*/

import { Stack } from '@/scripts/stack'

describe('Create Stack', () => {
    test('Has slots', () => {
        let stack = new Stack(3, 0)
        expect(stack.size).toBe(3)
    })
})

describe('Add/Remove to/from Stack', () => {
    let stack = new Stack(3, 0)
    test('Empty', () => {
        expect(stack.ballCount).toBe(0)
    }),
        test('Add One', () => {
            stack.addBall("1");
            expect(stack.ballCount).toBe(1)
        }),
        test('Add Another', () => {
            stack.addBall("2");
            expect(stack.ballCount).toBe(2)
        }),
        test('Remove One', () => {
            let removedBall = stack.removeBall();
            expect(removedBall).toBe("2")
            expect(stack.ballCount).toBe(1)
        })
    test('Remove Another', () => {
        let removedBall = stack.removeBall();
        expect(removedBall).toBe("1")
        expect(stack.ballCount).toBe(0)
    })

})

describe("Stack toString", () => {
    let stack = new Stack(4, 0)
    test("Correct String", () => {
        expect(stack.toString()).toBe("    ");
        stack.addBall("1");
        expect(stack.toString()).toBe("   1");
        stack.addBall("A");
        expect(stack.toString()).toBe("  A1");
    })
    test("TopBall1", () => {
        expect(stack.topBall).toBe("A");
    })
    test("Can Recieve Ball", () => {
        expect(stack.canReceiveBall).toBe(true);
        stack.addBall("1");
        expect(stack.canReceiveBall).toBe(true);
        stack.addBall("B");
        expect(stack.canReceiveBall).toBe(false);
    })
    test("TopBall2", () => {
        expect(stack.topBall).toBe("B");
    })
    test("toString2", () => {
        expect(stack.toString()).toBe("B1A1");
    })
})

describe("Stack entropy", () => {
    let stack = new Stack(4, 0)
    test("Entropy", () => {
        expect(stack.entropy).toBeCloseTo(0);
        stack.addBall("1");
        stack.addBall("A");
        expect(stack.entropy).toBe(.9);
        stack.removeBall()
        stack.addBall("1");
        stack.addBall("1");
        stack.addBall("1");
        expect(stack.entropy).toBe(0);
    })
})


describe("Stack Load", () => {
    let stack = new Stack(4, 0);
    stack.load("1234");
    test("Correct String", () => {
        expect(stack.toString()).toBe("1234");
    })
})

describe("CanGiveBallForReverse", ()=>{
    let stack = new Stack(4, 0);
    test("CanGiveBallForReverse", ()=>{
        stack.load("1234");
        expect(stack.canGiveBallForReverse).toBe(false);
        stack.load("    ");
        expect(stack.canGiveBallForReverse).toBe(false);
        stack.load("12  ");
        expect(stack.canGiveBallForReverse).toBe(false);
        stack.load("11 ");
        expect(stack.canGiveBallForReverse).toBe(true);
        stack.load("2222");
        expect(stack.canGiveBallForReverse).toBe(true);
        stack.load("1   ");
        expect(stack.canGiveBallForReverse).toBe(true);
    })
})
