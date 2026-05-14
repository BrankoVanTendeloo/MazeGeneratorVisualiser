import { MazeNode } from "./maze_node";

export class MazeGraph {
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

    public setNodeNullConnections(x: number, y: number): void {
        const rows: number = this.getMazeHeight()
        const columns: number = this.getMazeWidth()
        const node: MazeNode = this.getNodeFromCoordinate(x, y)

        if (x === 0) node.westIn = null
        if (y === 0) node.northIn = null
        if (x === columns) node.eastIn = null
        if (x === rows) node.southIn = null
    }

    public getMazeHeight(): number {
        return this.grid.length
    }
    public getMazeWidth(): number {
        return this.grid[0].length
    }
}
