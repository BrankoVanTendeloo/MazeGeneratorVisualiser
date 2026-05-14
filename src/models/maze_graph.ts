import { MazeNode } from "./maze_node";

export class MazeGrid {
    grid: MazeNode[][]

    constructor(rows: number, columns: number | null = null) {
        this.grid = []
        if (columns === null) columns = rows
        for (let i = 0; i < rows; i++) {
            const row: MazeNode[] = []
            for (let j = 0; j < columns; j++) {
                const emptyNode: MazeNode = { isOrigin: false, x: j, y: i }
                row.push(emptyNode)
            }
            this.grid.push(row)
        }
    }

    public getNodeFromCoordinate(x: number, y: number): MazeNode {
        return this.grid[y][x]
    }

    public getMazeHeight(): number {
        return this.grid.length
    }
    public getMazeWidth(): number {
        return this.grid[0].length
    }
}
