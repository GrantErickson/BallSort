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
              <CStack
                :stack="stack"
                :index="index"
                @click="stackClick"
              ></CStack>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="undo" color="primary">Undo</v-btn>
          <v-btn>{{ board.entropy.toFixed(2) }}</v-btn>
          <v-btn>{{ isSolvable }}</v-btn>
          <v-btn v-if="nextMove!=null"
            >{{ nextMove.fromStack.index + 1 }} to
            {{ nextMove.toStack.index + 1 }}</v-btn
          >
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

@Component
export default class GamePage extends Vue {
  board: Board = new Board(11, 4)
  nextMove: Move|null = null

  mounted() {
    this.board.load('VTKBVCTPBCPSPLCSVBLSPGTGKSLBKTGVLGKC        ')
  }

  stackClick(cStack: CStack) {
    this.board.attemptMove(cStack.stack)
    console.log(`Got click ${cStack.index}`)
  }

  undo() {
    this.board.undoMove()
  }

  get isSolvable(): boolean {
    let solver: Solver = new Solver(this.board.clone())
    let moves = solver.solve([])
    if (moves.length > 0) {
      this.nextMove = moves[moves.length - 1]
      this.board.clearHighlights()
      this.board.stacks[this.nextMove.fromStack.index].highlightedFrom = true
      this.board.stacks[this.nextMove.toStack.index].highlightedTo = true
      return true
    }
    return false
  }
}
</script>
