export const forgeTimeblock = async (message: string) => {
    const req = new Request(`http://localhost:5243/forge` ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    Message: message,
                }
            )
        })

    const response = await fetch(req, {credentials:"include"})

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json()
}