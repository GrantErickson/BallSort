export class Stack {
    balls: number[] = [];
    readonly size: number;

    constructor(size: number) {
        this.size = size;
    }

    get ballCount(): number {
        return this.balls.length
    }
    entropy(): number {
        // Calculate entropy of this stack 
        // Full of the name type is 0
        // Empty is .5
        // Each different ball going down increases entropy by .5
        // Each blank spot increases entropy by .2
        let result = (this.size - 1 - (this.balls.length)) * .2;
        let lastBall = -1
        for (let i = this.balls.length - 1; i >= 0; i--) {
            if (lastBall = -1) {
                lastBall = this.balls[i];
            } else {
                if (lastBall != this.balls[i]) {
                    result += .5;
                    lastBall = this.balls[i]
                }
            }
        }
        return result;
    }

    addBall(ball: number) {
        if (this.balls.length < this.size) {
            this.balls.push(ball);
        } else {
            throw new Error("Stack is full");
        }
    }

    removeBall(): number {
        if (this.balls.length > 0) {
            return this.balls.pop() as number;
        } else {
            throw new Error("Stack is empty");
        }
    }
}