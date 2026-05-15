import { MazeGraph } from "./maze_graph";

interface Coordinates { x: number, y: number }

type renderType = "walls" | "graph" | "both"

export class MazeDrawer {

    graph: MazeGraph
    canvas: HTMLCanvasElement
    canvasWidth: number
    canvasHeight: number

    canvasMargin: number
    ctx: CanvasRenderingContext2D

    constructor(graph: MazeGraph, canvas: HTMLCanvasElement, render: renderType) {
        this.graph = graph
        this.canvas = canvas

        this.canvasWidth = this.canvas.width
        this.canvasHeight = this.canvas.height

        this.canvasMargin = 10

        this.ctx = canvas.getContext("2d")!

        if (render !== "walls") this.drawAllNodes()
    }

    public drawNode(x: number, y: number): void {
        const coords = this.nodeCoordinatesToPixelCoordinates(x, y)

        this.ctx.beginPath()
        this.ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI)
        this.ctx.strokeStyle = "black"
        this.ctx.stroke()
    }

    public drawAllNodes(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let row of this.graph.grid) {
            for (let node of row) {
                this.drawNode(node.x, node.y)
            }
        }
    }

    protected getSquareSize(): number {
        return Math.min((this.canvasWidth - (this.canvasMargin * 2)) / this.graph.getMazeWidth(), (this.canvasHeight - (this.canvasMargin * 2)) / this.graph.getMazeHeight())
    }

    public nodeCoordinatesToPixelCoordinates(x: number, y: number): Coordinates {
        const squareSize = this.getSquareSize()
        const xAddition: number = (this.canvas.width - (squareSize * this.graph.getMazeWidth())) / 2
        const yAddition: number = (this.canvas.height - (squareSize * this.graph.getMazeHeight())) / 2

        return {
            x: (x + 0.5) * squareSize + xAddition,
            y: (y + 0.5) * squareSize + yAddition
        }
    }
}
