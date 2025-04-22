export const register = async ({email, password}: {email:string, password:string}) => {
    const req = new Request("http://localhost:5243/timeblock",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            )
        }
    )

    const response = await fetch(req)
    return response.json()
}