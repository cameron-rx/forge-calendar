export const register = async ({email, password}: {email:string, password:string}) => {
    const req = new Request("http://localhost:5243/register",
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

    if (response.ok) {
        return true;
    } else if (response.status == 400) {
        throw new Error('Account already created with that email address')
    } else if (!response.ok) {
        throw new Error('Network response was not ok')
    }

}

export const login = async ({email, password}: {email:string, password:string}) => {
    const req = new Request("http://localhost:5243/login?useCookies=true&useSessionCookies=true",
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
    
    const response = await fetch(req, {credentials: "include"}) 

    if (response.ok) {
        return true;
    } else if (response.status == 401) {
        throw new Error('Incorrect login details')
    } else if (!response.ok) {
        throw new Error('Network response was not ok')
    }

}