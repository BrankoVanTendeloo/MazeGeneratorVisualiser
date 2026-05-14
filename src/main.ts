import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { HomePage } from "./pages/home/home";

const homePage = new HomePage()
homePage.render()

const heightRange = document.querySelector<HTMLInputElement>("#heightRange")!
const widthRange = document.querySelector<HTMLInputElement>("#widthRange")!
const heightSpan = document.querySelector<HTMLSpanElement>("#height-current-value")!
const widthSpan = document.querySelector<HTMLSpanElement>("#width-current-value")!


// range event listeners
let mazeSize = { width: widthRange.value, height: heightRange.value }
heightSpan.innerText = mazeSize.height
widthSpan.innerText = mazeSize.width

heightRange.addEventListener("input", () => {
    heightSpan.innerText = heightRange.value
    mazeSize.height = heightRange.value
})

widthRange.addEventListener("input", () => {
    widthSpan.innerText = widthRange.value
    mazeSize.width = widthRange.value
})