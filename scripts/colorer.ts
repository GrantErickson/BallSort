export abstract class Colorer {
  private static colors: Map<string, string> = new Map<string, string>()
  private static standardColors: string[] = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'pink',
    'brown',
    'teal',
    'grey',
    'lime',
    'red darken-2',
    'green darken-2',
    'blue darken-2',
    'orange darken-2',
    'purple darken-2',
    'pink darken-2',
    'brown darken-2',
    'teal darken-2',
    'grey darken-2',
    'lime darken-2',
  ]

  public static getColor(item: string): string {
    if (this.colors.has(item)) {
      return this.colors.get(item)!
    } else {
      const color = this.standardColors.pop()!
      this.colors.set(item, color)
      return color
    }
  }
}
