import {Stack} from '@/scripts/stack';

export class Move{
    fromStack: Stack
    toStack: Stack

    constructor(fromstack: Stack, toStack: Stack){
        this.fromStack = fromstack
        this.toStack = toStack;
    }
}