<template>
  <v-chip v-bind:class="color" class="my-0"> {{ ball }} </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Colorer } from '@/scripts/colorer'

@Component
export default class CBall extends Vue {
  @Prop()
  ball!: string

  get color(): string {
    return Colorer.getColor(this.ball)
  }
}
</script>
