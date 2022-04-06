<template>
  <v-card
    :class="{
        selected: stack.selected,
        highlightedFrom: stack.highlightedFrom,
        highlightedTo: stack.highlightedTo,
    }"
    class="stack rounded-xl rounded-tr-0 rounded-tl-0"
    @click="click()"
  >
    <v-card-text class="d-flex px-2">
      <v-row style="height: 100%" :class="heightClass" class="stack-content">
        <v-col cols="12" class="align-self-end">
          <CBall
            v-for="(ball, index) in balls"
            :key="index"
            :ball="ball"
            :style="{ background: ballColor(ball) }"
            :class="{ 'mb-3 mt-n2': stack.selected && index == 0 }"
          >
          </CBall>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Stack } from 'scripts/stack'
import { Colorer } from '@/scripts/colorer'

@Component
export default class CStack extends Vue {
  @Prop()
  stack!: Stack

  click(): void {
    this.$emit('click', this)
  }

  get balls(): string[] {
    return this.stack.balls.slice().reverse()
  }

  ballColor(ball: string) {
    return Colorer.getColor(ball)
  }

  get heightClass(): string {
    return `stack-height-${this.stack.size}`
  }
}
</script>

<style scoped>
.stack.selected {
  border-left: solid 4px lightgray;
  border-right: solid 4px lightgray;
  border-bottom: solid 4px lightgray;
}
.stack.highlightedFrom {
  border-bottom: solid 4px white;
}
.stack.highlightedTo {
  border-bottom: dashed 4px white;
}

.stack {
  max-width: 55px;
  min-width: 55px;
  border-left: solid 4px gray;
  border-right: solid 4px gray;
  border-bottom: solid 4px gray;
}

.stack-content {
  max-width: 55px;
  min-width: 55px;
}
.stack-height-3 {
  min-height: 130px;
}
.stack-height-4 {
  min-height: 160px;
}
.stack-height-5 {
  min-height: 190px;
}
</style>
