import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { HomePage } from "./pages/home/home";
import { MazeDrawer } from './models/maze_drawer';
import { MazeGraph } from './models/maze_graph';

type renderType = "walls" | "graph" | "both"

const homePage = new HomePage()
homePage.render()

const startButton = document.querySelector<HTMLButtonElement>("#start-button")!
const heightRange = document.querySelector<HTMLInputElement>("#heightRange")!
const widthRange = document.querySelector<HTMLInputElement>("#widthRange")!
const heightSpan = document.querySelector<HTMLSpanElement>("#height-current-value")!
const widthSpan = document.querySelector<HTMLSpanElement>("#width-current-value")!
const canvas = document.querySelector<HTMLCanvasElement>("#maze-canvas")!
const radios = document.querySelectorAll<HTMLInputElement>("input[name='maze-display']")

let maze: MazeGraph = new MazeGraph(+heightRange.value, +widthRange.value)
let mazeDrawer: MazeDrawer = new MazeDrawer(maze, canvas, "both")
let generating: boolean = false

// radio buttons function
for (let radio of radios) {
    radio.addEventListener("change", (e) => {
        if (radio.checked) {
            if (radio.value === "walls") mazeDrawer.changeRenderType("walls")
            else if (radio.value === "graph") mazeDrawer.changeRenderType("graph")
            else mazeDrawer.changeRenderType("both")
        }
    })
}

function getRenderStyle() {
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
    resetMaze()
    generating = true
    startButton.disabled = true
})

// range event listeners
let mazeSize = { width: widthRange.value, height: heightRange.value }
heightSpan.innerText = mazeSize.height
widthSpan.innerText = mazeSize.width

heightRange.addEventListener("input", () => {
    heightSpan.innerText = heightRange.value
    mazeSize.height = heightRange.value
    resetMaze()
    generating = false
    startButton.disabled = false
})

widthRange.addEventListener("input", () => {
    widthSpan.innerText = widthRange.value
    mazeSize.width = widthRange.value
    resetMaze()
    generating = false
    startButton.disabled = false
})


// Reset maze
function resetMaze(): void {
    maze = new MazeGraph(+heightRange.value, +widthRange.value)
    mazeDrawer = new MazeDrawer(maze, canvas, getRenderStyle())
}