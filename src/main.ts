import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { HomePage } from "./pages/home/home";
import { MazeDrawer } from './models/maze_drawer';
import { MazeGraph } from './models/maze_graph';

type renderType = "walls" | "graph" | "both"
type Direction = 'north' | "east" | "south" | "west"

const homePage = new HomePage()
homePage.render()

const startButton = document.querySelector<HTMLButtonElement>("#start-button")!
const heightRange = document.querySelector<HTMLInputElement>("#heightRange")!
const widthRange = document.querySelector<HTMLInputElement>("#widthRange")!
const heightSpan = document.querySelector<HTMLSpanElement>("#height-current-value")!
const widthSpan = document.querySelector<HTMLSpanElement>("#width-current-value")!
const canvas = document.querySelector<HTMLCanvasElement>("#maze-canvas")!
const radios = document.querySelectorAll<HTMLInputElement>("input[name='maze-display']")
const directionalInputs = document.querySelectorAll<HTMLButtonElement>(".directional-input")
const directionalUpButton = document.querySelector<HTMLCanvasElement>("#directional-up")!
const directionalLeftButton = document.querySelector<HTMLCanvasElement>("#directional-left")!
const directionalRightButton = document.querySelector<HTMLCanvasElement>("#directional-right")!
const directionalDownButton = document.querySelector<HTMLCanvasElement>("#directional-down")!
const directionalRandomButton = document.querySelector<HTMLCanvasElement>("#directional-random")!

let maze: MazeGraph = new MazeGraph(+heightRange.value, +widthRange.value)
let mazeDrawer: MazeDrawer = new MazeDrawer(maze, canvas, "both")

let generating: boolean = false

// automation
function generationLoop(): void {
    if (!generating) return

    moveOrigin("random")

    requestAnimationFrame(generationLoop)
}

// directional inputs event listeners
directionalRandomButton.addEventListener("click", () => {
    moveOrigin("random")
})
directionalUpButton.addEventListener("click", () => {
    moveOrigin("north")
})
directionalRightButton.addEventListener("click", () => {
    moveOrigin("east")
})
directionalDownButton.addEventListener("click", () => {
    moveOrigin("south")
})
directionalLeftButton.addEventListener("click", () => {
    moveOrigin("west")
})

// radio buttons function
for (let radio of radios) {
    radio.addEventListener("change", () => {
        if (radio.checked) {
            if (radio.value === "walls") mazeDrawer.changeRenderType("walls")
            else if (radio.value === "graph") mazeDrawer.changeRenderType("graph")
            else mazeDrawer.changeRenderType("both")
        }
    })
}

function getRenderStyle(): renderType {
    for (let radio of radios) if (radio.checked) {
        if (radio.value === "walls") return "walls"
        else if (radio.value === "graph") return "graph"
        else return "both"
    }
    return "both"
}

// set canvas size
const sizeOfCanvas = canvas.getBoundingClientRect()
canvas.width = sizeOfCanvas.width
canvas.height = sizeOfCanvas.height

resetMaze()

// start button event listeners
startButton.addEventListener("click", () => {
    if (generating) {
        setGenerating(false)
        startButton.innerText = "Start random generation"
    } else {
        setGenerating(true)
        startButton.innerText = "Pause generation"
    }
})

// range event listeners
let mazeSize = { width: widthRange.value, height: heightRange.value }
heightSpan.innerText = mazeSize.height
widthSpan.innerText = mazeSize.width

heightRange.addEventListener("input", () => {
    heightSpan.innerText = heightRange.value
    mazeSize.height = heightRange.value
    resetMaze()
    setGenerating(false)
})

widthRange.addEventListener("input", () => {
    widthSpan.innerText = widthRange.value
    mazeSize.width = widthRange.value
    resetMaze()
    setGenerating(false)
})


// Reset maze
function resetMaze(): void {
    maze = new MazeGraph(+heightRange.value, +widthRange.value)
    mazeDrawer = new MazeDrawer(maze, canvas, getRenderStyle())
    setAllDirectionalInputsDisabled()
}

// generating change scripts
function setGenerating(on: boolean): void {
    generating = on
    widthRange.disabled = on
    heightRange.disabled = on
    setAllDirectionalInputsDisabled()

    if (on) {
        generationLoop()
    }
}

function setAllDirectionalInputsDisabled(): void {
    for (let button of directionalInputs) setDirectionalInputDisabled(button)
    if (maze.getMazeHeight() < 2 && maze.getMazeWidth() < 2) startButton.disabled = true
    else startButton.disabled = false
}

function setDirectionalInputDisabled(button: HTMLButtonElement): void {
    if (generating) button.disabled = true
    else if (button.isSameNode(directionalUpButton)) button.disabled = !maze.canMoveInDirection("north")
    else if (button.isSameNode(directionalRightButton)) button.disabled = !maze.canMoveInDirection("east")
    else if (button.isSameNode(directionalDownButton)) button.disabled = !maze.canMoveInDirection("south")
    else if (button.isSameNode(directionalLeftButton)) button.disabled = !maze.canMoveInDirection("west")
    else if (button.isSameNode(directionalRandomButton)) button.disabled = (maze.getMazeHeight() < 2 && maze.getMazeWidth() < 2)
    else button.disabled = false
}

function moveOrigin(direction: Direction | "random"): void {
    if (direction === "random") {
        const possible: Direction[] = maze.getValidMoveDirections()
        direction = possible[Math.floor(Math.random() * possible.length)]
    }
    maze.moveOrigin(direction)
    mazeDrawer.drawMazeFromSettings()
    setAllDirectionalInputsDisabled()
}