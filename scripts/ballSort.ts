import { Stack } from "./stack";
import { Move } from "./move"

export class BallSort {
    readonly stackCount: number;
    readonly stackSize: number;
    readonly stacks: Stack[] = [];
    private gameStates: string[] = [];

    constructor(stackCount: number, stackSize: number) {
        this.stackCount = stackCount;
        this.stackSize = stackSize;
        for (let i = 0; i < stackCount; i++) {
            this.stacks.push(new Stack(stackSize));
        }
    }

    public availableMoves(): Move[] {
        let result: Move[] = []
        for(let targetStack of this.stacks){
            if(targetStack.canReceiveBall){
                for(let sourceStack of this.stacks){
                    if(targetStack != sourceStack && sourceStack.ballCount > 0){
                        if (targetStack.ballCount === 0 || targetStack.topBall == sourceStack.topBall){
                            result.push(new Move(sourceStack, targetStack));
                        }
                    }
                }
            }
        }
        return result;
    }

    public toString(): string {
        let result: string = ""
        for (let stack of this.stacks) {
            result = result + stack.toString()
        }
        return result;
    }
}