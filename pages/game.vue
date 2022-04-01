<template>
  <v-row>
    <v-col class="text-center">
      <v-card>
        <v-card-title>
          <h1>Sort the Balls</h1>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(stack, index) in board.stacks"
              v-bind:key="index"
              class=""
            >
              <CStack :stack="stack" @click="stackClick"></CStack>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="undo" color="primary">Undo</v-btn>
          <v-chip class="mx-2">entropy: {{ board.entropy.toFixed(2) }}</v-chip>
          <v-chip class="mx-2">solvable: {{ isSolvable }}</v-chip>
          <v-chip v-if="nextMove != null" class="mx-2"
            >hint: {{ nextMove.fromStack + 1 }} to
            {{ nextMove.toStack + 1 }}</v-chip
          >
          <v-spacer></v-spacer>
          <v-btn @click="solve()" v-if="!solving" class="primary">Solve</v-btn>
          <v-btn @click="stopSolve()" v-if="solving" class="warning"
            >Stop</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-banner v-if="winner" color="secondary" elevation="7"
            >You Win!</v-banner
          >
          <v-spacer></v-spacer>
          <v-btn @click="newGame(1)">Easy</v-btn>
          <v-btn @click="newGame(2)">Medium</v-btn>
          <v-btn @click="newGame(3)">Hard</v-btn>
          <v-btn @click="randomGame(4, 3, 2)">Random Easy</v-btn>
          <v-btn @click="randomGame(6, 4, 2)">Random Medium </v-btn>
          <v-btn @click="randomGame(9, 5, 2)">Random Hard</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Board } from '@/scripts/board'
import CStack from '@/components/CStack.vue'
import { Solver } from '@/scripts/solver'
import { Move } from '@/scripts/move'
import { Randomizer } from '@/scripts/randomizer'

@Component
export default class GamePage extends Vue {
  board: Board = new Board(5, 3)
  nextMove: Move | null = null
  solving: boolean = false
  timeout: NodeJS.Timeout | null = null

  mounted() {
    this.newGame(2)
  }

  newGame(gameNumber: number) {
    switch (gameNumber) {
      case 1:
        this.board = new Board(4, 3, '321233112   ')
        break
      case 2:
        this.board = new Board(7, 4, 'VCCKKCTBCTVVVBKTBTBK        ')
        break
      case 3:
        this.board = new Board(
          11,
          4,
          'VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        '
        )
        break
    }
  }

  randomGame(balls: number, stackSize: number, openStacks: number) {
    this.board = Randomizer.getGame(balls, stackSize, openStacks)
  }

  stackClick(cStack: CStack) {
    this.board.attemptMove(cStack.stack)
    console.log(`Got click ${cStack.stack.index}`)
  }

  undo() {
    this.board.undoMove()
  }

  get isSolvable(): boolean {
    if (this.solving) return true
    let solver: Solver = new Solver(this.board.clone())
    let moves = solver.solve()
    this.board.clearHighlights()
    if (moves == null) {
      this.nextMove = null
      return false
    }

    if (moves.length > 0) {
      this.nextMove = moves[moves.length - 1]
      this.board.stacks[this.nextMove.fromStack].highlightedFrom = true
      this.board.stacks[this.nextMove.toStack].highlightedTo = true
      return true
    }
    return false
  }

  get winner(): boolean {
    return this.board.entropy == 0
  }

  solve(): void {
    let solver: Solver = new Solver(this.board.clone())
    let moves = solver.solve()
    if (moves && moves.length > 0) this.makeMove(moves!)
  }

  stopSolve(): void {
    if (this.timeout) clearTimeout(this.timeout)
    this.solving = false
  }

  makeMove(moves: Move[]): void {
    this.solving = true
    let move = moves.pop()!
    this.board.clearHighlights()
    this.nextMove = move
    this.board.stacks[move.fromStack].highlightedFrom = true
    this.board.stacks[move.toStack].highlightedTo = true

    this.board.attemptMove(this.board.stacks[move.fromStack])
    this.timeout = setTimeout(() => {
      this.board.attemptMove(this.board.stacks[move.toStack])
      if (moves.length > 0) {
        this.timeout = setTimeout(() => {
          this.makeMove(moves)
        }, 250)
      } else {
        this.solving = false
      }
    }, 500)
  }
}
</script>
