export class Stack {
    balls: string[] = [];
    readonly size: number;

    constructor(size: number) {
        this.size = size;
    }

    get ballCount(): number {
        return this.balls.length
    }
    get entropy(): number {
        // Calculate entropy of this stack 
        // Full of the name type is 0
        // Empty is .5
        // Each different ball going down increases entropy by .5
        // Each blank spot increases entropy by .2
        let result = (this.size - this.balls.length) * .2;
        let lastBall = null
        for (let i = this.balls.length - 1; i >= 0; i--) {
            if (lastBall == null) {
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

    addBall(ball: string) {
        if (this.balls.length < this.size) {
            this.balls.push(ball);
        } else {
            throw new Error("Stack is full");
        }
    }

    removeBall(): string {
        if (this.balls.length > 0) {
            return this.balls.pop() as string;
        } else {
            throw new Error("Stack is empty");
        }
    }

    toString(): string {
        let result: string = "";
        for (let b of this.balls) {
            result = b + result
        }
        result = result.padStart(this.size, " ");
        return result;
    }

    get canReceiveBall(): boolean {
        return this.balls.length < this.size;
    }

    get topBall():string|null {
        if (this.balls.length === 0 ) return null;
        return this.balls[this.balls.length - 1];
    }
}