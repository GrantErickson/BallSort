import { Stack } from "./stack";

export class BallSort{
    readonly stackCount: number;
    readonly stackSize: number;
    readonly stacks: Stack[] = [];
    
    constructor(stackCount: number, stackSize: number){
        this.stackCount = stackCount;
        this.stackSize = stackSize;
        for (let i = 0; i < stackCount; i++) {
            this.stacks.push(new Stack(stackSize));
        }
    }
}