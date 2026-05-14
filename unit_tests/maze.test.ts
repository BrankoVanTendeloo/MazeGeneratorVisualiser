import { describe, it, expect, beforeEach } from "vitest"
import { MazeGraph } from "../src/models/maze_graph"

describe("Maze Class", () => {
    let maze: MazeGraph

    it("Should make a square maze if no columns were given", () => {
        maze = new MazeGraph(5)
        expect(maze.getMazeHeight()).toBe(maze.getMazeWidth())
    })
})