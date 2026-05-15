import { MazeNode } from "./maze_node";

type Direction = 'north' | "east" | "south" | "west"

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

    public validateMaze(): boolean {
        let originsSeen: number = 0
        for (let row of this.grid) {
            for (let node of row) {
                const outgoingConnections: Direction[] = this.getNodeOutgoingConnections(node.x, node.y)
                if ((node.isOrigin && outgoingConnections.length !== 0) || (!node.isOrigin && outgoingConnections.length !== 1)) return false
                if (node.isOrigin) originsSeen++
            }
        }
        return (originsSeen === 1)
    }

    public getNodeIncomingConnections(x: number, y: number): Direction[] {
        const connectionsFound: Direction[] = []
        const node: MazeNode = this.getNodeFromCoordinate(x, y)
        if (node.northIn) connectionsFound.push("north")
        if (node.eastIn) connectionsFound.push("east")
        if (node.southIn) connectionsFound.push("south")
        if (node.westIn) connectionsFound.push("west")
        return connectionsFound
    }

    public getNodeValidConnectionDirections(x: number, y: number): Direction[] {
        const validConnections: Direction[] = []
        const node: MazeNode = this.getNodeFromCoordinate(x, y)
        if (node.northIn !== null) validConnections.push("north")
        if (node.eastIn !== null) validConnections.push("east")
        if (node.southIn !== null) validConnections.push("south")
        if (node.westIn !== null) validConnections.push("west")
        return validConnections
    }

    public getNodeOutgoingConnections(x: number, y: number): Direction[] {
        const connectionsFound: Direction[] = []
        const validConnections: Direction[] = this.getNodeValidConnectionDirections(x, y)

        if (validConnections.includes("north") && this.getNodeFromCoordinate(x, y - 1).southIn) connectionsFound.push("north")
        if (validConnections.includes("east") && this.getNodeFromCoordinate(x + 1, y).westIn) connectionsFound.push("east")
        if (validConnections.includes("south") && this.getNodeFromCoordinate(x, y + 1).northIn) connectionsFound.push("south")
        if (validConnections.includes("west") && this.getNodeFromCoordinate(x - 1, y).eastIn) connectionsFound.push("west")

        return connectionsFound
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
                node.westIn = false
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
        if (x === columns - 1) node.eastIn = null
        if (y === rows - 1) node.southIn = null
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

    public getOriginCoordinates(): { x: number, y: number } | undefined {
        for (let row of this.grid) {
            for (let node of row) {
                if (node.isOrigin) {
                    return {
                        x: node.x,
                        y: node.y
                    }
                }
            }
        }
        return undefined
    }

    public getNodeInDirection(x: number, y: number, direction: Direction): { x: number, y: number } | undefined {
        if (direction === "north") return { x: x, y: y - 1 }
        else if (direction === "east") return { x: x + 1, y: y }
        else if (direction === "south") return { x: x, y: y + 1 }
        else if (direction === "west") return { x: x - 1, y: y }
        else return undefined
    }

    public getAllConnections(): { from: { x: number, y: number }, to: { x: number, y: number } }[] {
        const output: { from: { x: number, y: number }, to: { x: number, y: number } }[] = []
        for (let row of this.grid) {
            for (let node of row) {
                if (node.northIn) {
                    const connectedCoords = this.getNodeInDirection(node.x, node.y, "north")!
                    output.push({ from: { x: node.x, y: node.y }, to: { x: connectedCoords.x, y: connectedCoords.y } })
                }
                if (node.eastIn) {
                    const connectedCoords = this.getNodeInDirection(node.x, node.y, "east")!
                    output.push({ from: { x: node.x, y: node.y }, to: { x: connectedCoords.x, y: connectedCoords.y } })
                }
                if (node.southIn) {
                    const connectedCoords = this.getNodeInDirection(node.x, node.y, "south")!
                    output.push({ from: { x: node.x, y: node.y }, to: { x: connectedCoords.x, y: connectedCoords.y } })
                }
                if (node.westIn) {
                    const connectedCoords = this.getNodeInDirection(node.x, node.y, "west")!
                    output.push({ from: { x: node.x, y: node.y }, to: { x: connectedCoords.x, y: connectedCoords.y } })
                }
            }
        }
        return output
    }
}
