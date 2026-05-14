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

    it("getNodeValidConnectionDirections should return valid connection directions", () => {
        maze = new MazeGraph(14)

        let coordinates = { x: 0, y: 0 }
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("west")).toBe(false)

        coordinates = { x: 5, y: 5 }
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("north")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("west")).toBe(true)

        coordinates = { x: 2, y: 0 }
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("west")).toBe(true)

        coordinates = { x: 13, y: 0 }
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("west")).toBe(true)

        coordinates = { x: 7, y: 13 }
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("north")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("south")).toBe(false)
        expect(maze.getNodeValidConnectionDirections(coordinates.x, coordinates.y).includes("west")).toBe(true)
    })

    it("Random node validation should pass", () => {
        maze = new MazeGraph(8)

        let coordinates = { x: 0, y: 0 }
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).northIn).toBe(null)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).eastIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).southIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).westIn).toBe(null)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("south")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)

        coordinates = { x: 5, y: 5 }
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).northIn).toBe(false)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).eastIn).toBe(false)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).southIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).westIn).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("north")).toBe(true)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("south")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)

        coordinates = { x: 2, y: 0 }
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).northIn).toBe(null)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).eastIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).southIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).westIn).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("east")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("south")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("west")).toBe(true)

        coordinates = { x: 7, y: 0 }
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).northIn).toBe(null)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).eastIn).toBe(null)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).southIn).toBe(true)
        expect(maze.getNodeFromCoordinate(coordinates.x, coordinates.y).westIn).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("south")).toBe(true)
        expect(maze.getNodeIncomingConnections(coordinates.x, coordinates.y).includes("west")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("north")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("east")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("south")).toBe(false)
        expect(maze.getNodeOutgoingConnections(coordinates.x, coordinates.y).includes("west")).toBe(true)
    })

    it("New mazes should be valid", () => {
        maze = new MazeGraph(4, 6)
        expect(maze.validateMaze()).toBe(true)
        maze = new MazeGraph(7)
        expect(maze.validateMaze()).toBe(true)
        maze = new MazeGraph(1, 5)
        expect(maze.validateMaze()).toBe(true)
        maze = new MazeGraph(9, 1)
        expect(maze.validateMaze()).toBe(true)
        maze = new MazeGraph(1)
        expect(maze.validateMaze()).toBe(true)
    })
})
