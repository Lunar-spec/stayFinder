const API_BASE_URL = "http://localhost:3000/";

export async function getAllLodgings(): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}api/lodgings`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching lodgings:", error);
        throw error;
    }
}

export async function registerUser(userData: any): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUser(credentials: any): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        console.log("Response from loginUser:", response);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function getLodgingById(propertyId: string): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}api/lodgings/${propertyId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching lodging by ID:", error);
        throw error;
    }
}