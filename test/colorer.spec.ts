/**
* @jest-environment node
*/

import { Colorer } from '@/scripts/colorer'

describe('Colorer Test', () => {
  test('Two colors', () => {
    const color1 = Colorer.getColor("a");
    const color2 = Colorer.getColor("b");
    expect(Colorer.getColor("a")).toBe(color1)
    expect(Colorer.getColor("b")).toBe(color2)
  })
})

