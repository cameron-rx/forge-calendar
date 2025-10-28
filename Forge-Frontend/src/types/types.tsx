export type Timeblock = {
    id: number
    name: string
    location: string
    startTime: Date
    endTime: Date
}

export type TimeblockResponseDTO = {
    id: number
    name: string
    location: string
    startTime: string
    endTime: string
}
