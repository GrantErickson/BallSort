export abstract class Colorer {
    private static colors: Map<string, string> = new Map<string, string>();
    private static standardColors: string[] = ["red", "green", "blue", "orange", "purple", "pink", "brown", "teal", "grey", "darkolive"];

    public static getColor(item: string): string {
        if (this.colors.has(item)) {
            return this.colors.get(item)!;
        } else {
            let color = this.standardColors.pop()!;
            this.colors.set(item, color);
            return color;
        }
    }
}
