import { Stack } from "./stack";
import { Move } from "./move"

export class Board {
    readonly stackCount: number;
    readonly stackSize: number;
    readonly stacks: Stack[] = [];
    readonly moves: Move[] = [];

    constructor(stackCount: number, stackSize: number) {
        this.stackCount = stackCount;
        this.stackSize = stackSize;
        for (let i = 0; i < stackCount; i++) {
            this.stacks.push(new Stack(stackSize, i));
        }
    }

    load(board: string) {
        for (let i = 0; i < board.length; i = i + this.stackSize) {
            let stack = this.stacks[i / this.stackSize];
            stack.load(board.substr(i, this.stackSize));
        }
    }

    public availableMoves(): Move[] {
        let result: Move[] = []
        for (let targetStack of this.stacks) {
            if (targetStack.canReceiveBall) {
                for (let sourceStack of this.stacks) {
                    if (targetStack != sourceStack && sourceStack.ballCount > 0) {
                        if (targetStack.ballCount === 0 || targetStack.topBall == sourceStack.topBall) {
                            result.push(new Move(sourceStack, targetStack));
                        }
                    }
                }
            }
        }
        return result;
    }

    public moveBall(move: Move) {
        move.toStack.addBall(move.fromStack.removeBall());
        this.moves.push(move)
    }

    public undoMove() {
        if (this.moves.length > 0) {
            let move = this.moves.pop();
            move!.fromStack.addBall(move!.toStack.removeBall());
        }
    }


    public toString(): string {
        let result: string = ""
        for (let stack of this.stacks) {
            result = result + stack.toString()
        }
        return result;
    }

    get entropy(): number {
        let result = 0;
        for (let stack of this.stacks) {
            result += stack.entropy;
        }
        return result;
    }

    get selectedStack(): Stack | null {
        let selecteds = this.stacks.filter(s => s.selected);
        if (selecteds.length > 0) return selecteds[0];
        return null;
    }

    attemptMove(stack: Stack) {
        if (this.selectedStack == null) {
            if (stack.ballCount !== 0) {
                stack.selected = true;
                console.log(`Selected stack ${stack.index}`);
            }
        } else if (this.selectedStack == stack) {
            stack.selected = false;
            console.log(`Deselected stack ${stack.index}`);
        } else {
            console.log(`Attempting to move from ${this.selectedStack.index} to ${stack.index}`);
            console.log(`Attempting top from ${this.selectedStack.topBall} to ${stack.topBall}`);
            let moveHappened: boolean = false
            if (stack.canReceiveBall &&
                (stack.ballCount === 0 || stack.topBall == this.selectedStack.topBall)) {
                console.log(`"Moving from ${this.selectedStack.index} to ${stack.index}`);
                this.moveBall(new Move(this.selectedStack, stack));
                this.selectedStack.selected = false;
                moveHappened = true;
            }
            if (!moveHappened) {
                this.selectedStack.selected = false;
                if (stack.ballCount !== 0) {
                    stack.selected = true;
                }
            }
        }
    }

    clone(): Board {
        let newBoard = new Board(this.stackCount, this.stackSize)
        newBoard.load(this.toString());

        return newBoard;
    }

    clearHighlights(): void {
        for (let stack of this.stacks) {
            stack.highlightedFrom = false;
            stack.highlightedTo = false;
        }
    }
}