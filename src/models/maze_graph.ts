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

        this.generateBaseMaze()
    }

    public getNodeFromCoordinate(x: number, y: number): MazeNode {
        return this.grid[y][x]
    }

    protected generateBaseMaze(): void {
        for (let row of this.grid) {
            for (let node of row) {
                node.northIn = false
                node.eastIn = (node.y === 0)
                node.southIn = true
                node.westIn = true
            }
        }

        this.grid[0][0].isOrigin = true

        this.setNodesNullConnections()
    }

    protected setNodeNullConnections(x: number, y: number): void {
        const rows: number = this.getMazeHeight()
        const columns: number = this.getMazeWidth()
        const node: MazeNode = this.getNodeFromCoordinate(x, y)

        if (x === 0) node.westIn = null
        if (y === 0) node.northIn = null
        if (x === columns) node.eastIn = null
        if (x === rows) node.southIn = null
    }

    protected setNodesNullConnections(): void {
        for (let row of this.grid) {
            for (let node of row) this.setNodeNullConnections(node.x, node.y)
        }
    }

    public getMazeHeight(): number {
        return this.grid.length
    }

    public getMazeWidth(): number {
        return this.grid[0].length
    }
}
