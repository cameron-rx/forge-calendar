import { Timeblock } from "@/types/types"

export const getTimeblocks = async () => {
    const response = await fetch("http://localhost:5243/timeblock")
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const createTimeblock = async (t: Timeblock) => {
    const req = new Request("http://localhost:5243/timeblock",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    Name: t.name,
                    Location: t.location,
                    StartTime: t.startTime.toISOString(),
                    EndTime: t.endTime.toISOString()
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

export const updateTimeblock = async (t: Timeblock) => {
    const req = new Request(`http://localhost:5243/timeblock/${t.id}` ,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    Name: t.name,
                    Location: t.location,
                    StartTime: t.startTime.toISOString(),
                    EndTime: t.endTime.toISOString()
                }
            )
        })

    const response = await fetch(req)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json()
}