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
    renderStyle: renderType

    constructor(graph: MazeGraph, canvas: HTMLCanvasElement, render: renderType) {
        this.graph = graph
        this.canvas = canvas
        this.renderStyle = render

        this.canvasWidth = this.canvas.width
        this.canvasHeight = this.canvas.height

        this.canvasMargin = 10


        this.ctx = this.canvas.getContext("2d")!

        this.drawMazeFromSettings()
    }

    public drawMazeFromSettings(render: renderType = this.renderStyle): void {
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        if (render !== "walls") {
            this.drawAllConnections()
            this.drawAllNodes()
        }
        if (render !== "graph") { }
    }

    public changeRenderType(render: renderType): void {
        this.renderStyle = render
        this.drawMazeFromSettings()
    }

    public drawNode(x: number, y: number, isOrigin: boolean = false): void {
        const coords = this.nodeCoordinatesToPixelCoordinates(x, y)

        this.ctx.beginPath()
        this.ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI)
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = "black"
        this.ctx.stroke()
        if (!isOrigin) {
            this.ctx.fillStyle = "white"
            this.ctx.fill()
        }
    }

    public drawAllNodes(): void {
        const originNodes = this.graph.getOriginCoordinates()!
        const originCoords = this.nodeCoordinatesToPixelCoordinates(originNodes.x, originNodes.y)
        this.drawOrigin(originCoords.x, originCoords.y)

        for (let row of this.graph.grid) {
            for (let node of row) {
                this.drawNode(node.x, node.y, node.isOrigin)
            }
        }
    }

    public drawConnection(connection: { from: Coordinates, to: Coordinates }): void {
        const fromCoords = this.nodeCoordinatesToPixelCoordinates(connection.from.x, connection.from.y)
        const toCoords = this.nodeCoordinatesToPixelCoordinates(connection.to.x, connection.to.y)
        const middleCoords = this.getMiddleOfLine(fromCoords, toCoords)

        this.ctx.beginPath()
        this.ctx.moveTo(fromCoords.x, fromCoords.y)
        this.ctx.lineTo(toCoords.x, toCoords.y)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "green"
        this.ctx.stroke()

        // draw the arrow
        let arrowEnd1: Coordinates = { x: middleCoords.x, y: middleCoords.y }
        let arrowEnd2: Coordinates = { x: middleCoords.x, y: middleCoords.y }
        const arrowSize = 5
        if (connection.from.x === connection.to.x) {
            arrowEnd1.x += arrowSize
            arrowEnd2.x -= arrowSize
            if (connection.from.y < connection.to.y) {
                arrowEnd1.y += arrowSize
                arrowEnd2.y += arrowSize
            } else {
                arrowEnd1.y -= arrowSize
                arrowEnd2.y -= arrowSize
            }
        } else {
            arrowEnd1.y += arrowSize
            arrowEnd2.y -= arrowSize
            if (connection.from.x < connection.to.x) {
                arrowEnd1.x += arrowSize
                arrowEnd2.x += arrowSize
            } else {
                arrowEnd1.x -= arrowSize
                arrowEnd2.x -= arrowSize
            }
        }

        this.ctx.lineCap = "round"
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "green"

        this.ctx.beginPath()
        this.ctx.moveTo(middleCoords.x, middleCoords.y)
        this.ctx.lineTo(arrowEnd1.x, arrowEnd1.y)
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(middleCoords.x, middleCoords.y)
        this.ctx.lineTo(arrowEnd2.x, arrowEnd2.y)
        this.ctx.stroke()
    }

    public drawAllConnections(): void {
        for (let connection of this.graph.getAllConnections()) this.drawConnection(connection)
    }

    protected getMiddleOfLine(from: Coordinates, to: Coordinates): Coordinates {
        return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
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

    public drawOrigin(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI)
        this.ctx.fillStyle = "red"
        this.ctx.fill()
    }
}
