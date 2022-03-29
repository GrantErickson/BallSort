<template>
  <v-card
    @click="click()"
    class="stack rounded-xl rounded-tr-0 rounded-tl-0"
    v-bind:class="{ selected: stack.selected, highlightedFrom: stack.highlightedFrom, highlightedTo: stack.highlightedTo }">
    <v-card-text class="d-flex px-2">
      <v-row style="height: 100%" class="stack-content">
        <v-col cols="12" class="align-self-end">
          <v-chip
            v-for="(ball, index) in balls"
            v-bind:key="index"
            :style="{'background-color': ballColor(ball)}"
            class="my-0"
          >
            {{ ball }}
          </v-chip>
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
  @Prop()
  index!: number

  click(): void {
    console.log(`Click Selected ${this.stack.selected}`)
    this.$emit('click', this)
  }

  get balls(): string[] {
    return this.stack.balls.slice().reverse()
  }

  ballColor(ball: string) {
    return Colorer.getColor(ball)
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
}   .stack.highlightedTo {
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
  min-height: 150px;
}

</style>