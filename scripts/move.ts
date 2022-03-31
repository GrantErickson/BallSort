import {Stack} from '@/scripts/stack';

export class Move {
  fromStack: number
  toStack: number

  constructor(fromstack: number, toStack: number) {
    this.fromStack = fromstack
    this.toStack = toStack
  }
}