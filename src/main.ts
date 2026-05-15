import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { HomePage } from "./pages/home/home";
import { MazeDrawer } from './models/maze_drawer';
import { MazeGraph } from './models/maze_graph';

const homePage = new HomePage()
homePage.render()

const startButton = document.querySelector<HTMLButtonElement>("#start-button")!
const heightRange = document.querySelector<HTMLInputElement>("#heightRange")!
const widthRange = document.querySelector<HTMLInputElement>("#widthRange")!
const heightSpan = document.querySelector<HTMLSpanElement>("#height-current-value")!
const widthSpan = document.querySelector<HTMLSpanElement>("#width-current-value")!
const canvas = document.querySelector<HTMLCanvasElement>("#maze-canvas")!

let maze: MazeGraph = new MazeGraph(+heightRange.value, +widthRange.value)
let mazeDrawer: MazeDrawer = new MazeDrawer(maze, canvas, "both")

let generating: boolean = false


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

function resetMaze(): void {
    maze = new MazeGraph(+heightRange.value, +widthRange.value)
    mazeDrawer = new MazeDrawer(maze, canvas, "both")
}