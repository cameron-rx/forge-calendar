import { Timeblock } from "@/types/types"

export const getTimeblocks = async () => {
    const response = await fetch("http://localhost:5243/timeblock")
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const createTimeblock = async (name: string, location: string, startTime: Date, endTime: Date) => {
    const req = new Request("http://localhost:5243/timeblock",
        {
            method: "POST",
            body: JSON.stringify(
                {
                    Name: name,
                    Location: location,
                    StarTime: startTime.toISOString(),
                    EndTime: endTime.toISOString()
                }
            )
        }
    )

    const response = await fetch(req)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json()
}