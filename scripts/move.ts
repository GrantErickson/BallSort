import {Stack} from '@/scripts/stack';

export class Move {
  fromStack: number
  toStack: number
  count: number

  constructor(fromstack: number, toStack: number, count:number = 1) {
    this.fromStack = fromstack
    this.toStack = toStack
    this.count = count
  }
}