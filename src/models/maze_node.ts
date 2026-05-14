export interface MazeNode {
    northIn?: boolean
    eastIn?: boolean
    southIn?: boolean
    westIn?: boolean
    isOrigin: boolean
    x: number
    y: number
}