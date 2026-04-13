import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:4000/api/auth",
    withCredentials: true,
});

const authFunc = async (url, method, data) => {
    try {
        const response = await authApi.request({ url, method, data });
        return response.data;
    } catch (error) {
        console.error("Error in auth function:", error);
        throw error;
    }
}

export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await authFunc("/register", "POST", { username, email, password });
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await authFunc("/login", "POST", { email, password });
        return response;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const response = await authFunc("/logout", "GET");
        return response;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

export const getMe = async () => {
    try {
        const response = await authFunc("/get-me", "GET");
        return response;
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error;
    }
}