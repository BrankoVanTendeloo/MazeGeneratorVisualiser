import { MazeGraph } from "./maze_graph";

interface Coordinates { x: number, y: number }

export class MazeDrawer {

    graph: MazeGraph
    canvas: HTMLCanvasElement
    canvasWidth: number
    canvasHeight: number

    canvasMargin: number

    constructor(graph: MazeGraph, canvas: HTMLCanvasElement) {
        this.graph = graph
        this.canvas = canvas

        this.canvasWidth = this.canvas.width
        this.canvasHeight = this.canvas.height

        this.canvasMargin = 10
    }

    protected getSquareSize(): number {
        return (this.canvasWidth - (this.canvasMargin * 2)) / this.graph.getMazeWidth()
    }

    public nodeCoordinatesToPixelCoordinates(x: number, y: number): Coordinates {
        return {
            x: (x + 0.5) * this.getSquareSize() + this.canvasMargin,
            y: (y + 0.5) * this.getSquareSize() + this.canvasMargin
        }
    }
}
