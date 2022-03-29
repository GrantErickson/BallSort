import { Stack } from "./stack";
import { Move } from "./move"

export class Board {
    readonly stackCount: number;
    readonly stackSize: number;
    readonly stacks: Stack[] = [];

    constructor(stackCount: number, stackSize: number) {
        this.stackCount = stackCount;
        this.stackSize = stackSize;
        for (let i = 0; i < stackCount; i++) {
            this.stacks.push(new Stack(stackSize));
        }
    }
    
    load(board: string){    
        for(let i = 0; i < board.length; i=i+this.stackSize){
            let stack = this.stacks[i/this.stackSize];
            stack.load(board.substr(i, this.stackSize));
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

    public moveBall(move:Move){
        move.toStack.addBall(move.fromStack.removeBall());
    }

    public toString(): string {
        let result: string = ""
        for (let stack of this.stacks) {
            result = result + stack.toString()
        }
        return result;
    }

    get entropy(): number{
        let result = 0;
        for(let stack of this.stacks){
            result += stack.entropy;
        }
        return result;
    }
}