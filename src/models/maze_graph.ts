import { MazeNode } from "./maze_node";

export class MazeGrid {
    grid: MazeNode[][]

    constructor(size: number) {
        this.grid = []
        for (let i = 0; i < size; i++) {
            const row: MazeNode[] = []
            for (let j = 0; j < size; j++) {
                const emptyNode: MazeNode = { "isOrigin": false }
                row.push(emptyNode)
            }
            this.grid.push(row)
        }
    }
}
