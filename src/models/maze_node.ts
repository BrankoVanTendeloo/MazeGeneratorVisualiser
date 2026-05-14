export interface MazeNode {
    northIn?: boolean | null
    eastIn?: boolean | null
    southIn?: boolean | null
    westIn?: boolean | null
    isOrigin: boolean
    x: number
    y: number
}
