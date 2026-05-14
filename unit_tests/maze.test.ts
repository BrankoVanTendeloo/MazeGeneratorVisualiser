import { describe, it, expect, beforeEach } from "vitest"
import { MazeGraph } from "../src/models/maze_graph"

describe("Maze Initialisation", () => {
    let maze: MazeGraph

    it("Should make a square maze if no columns were given", () => {
        maze = new MazeGraph(5)
        expect(maze.getMazeHeight()).toBe(maze.getMazeWidth())
        maze = new MazeGraph(10)
        expect(maze.getMazeHeight()).toBe(maze.getMazeWidth())
    })

    it("Should make a rectangular maze when columns were given", () => {
        maze = new MazeGraph(5, 3)
        expect(maze.getMazeHeight()).toBe(5)
        expect(maze.getMazeWidth()).toBe(3)
        maze = new MazeGraph(12, 13)
        expect(maze.getMazeHeight()).toBe(12)
        expect(maze.getMazeWidth()).toBe(13)
    })

    it("New mazes should have only (0,0) be an origin point", () => {
        maze = new MazeGraph(6)
        for (let i: number = 0; i < maze.getMazeHeight(); i++) {
            for (let j: number = 0; j < maze.getMazeWidth(); j++) expect(maze.getNodeFromCoordinate(j, i).isOrigin).toBe(i === j && i === 0)
        }
        maze = new MazeGraph(18, 21)
        for (let i: number = 0; i < maze.getMazeHeight(); i++) {
            for (let j: number = 0; j < maze.getMazeWidth(); j++) expect(maze.getNodeFromCoordinate(j, i).isOrigin).toBe(i === j && i === 0)
        }
    })
})
