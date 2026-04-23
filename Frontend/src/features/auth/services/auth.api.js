import axios from "axios";

const authApi = new axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api/auth",
    withCredentials: true,
});

export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await authApi.post("/register", { username, email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await authApi.post("/login", { email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const response = await authApi.get("/logout");
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMe = async () => {
    try {
        const response = await authApi.get("/get-me");
        return response;
    } catch (error) {
        throw error;
    }
}