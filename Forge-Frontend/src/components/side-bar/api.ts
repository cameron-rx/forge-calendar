export const logout = async () => {
    const req = new Request(`/api/auth/logout`,
        {
            method: "POST",
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

export const userInfo = async () => {
    const req = new Request(`/api/manage/info`)
    
    const response = await fetch(req, {credentials: "include"}) 

    if (response.ok) {
        return response.json();
    } else if (response.status == 401) {
        throw new Error('Incorrect login details')
    } else if (!response.ok) {
        throw new Error('Network response was not ok')
    }
}