import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, loginUser, logoutUser, registerUser } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { user, setUser, loading, setLoading } = context;

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        getAndSetUser();
    }, []);


    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const response = await registerUser({ username, email, password });
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await loginUser({ email, password });
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await logoutUser();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const response = await getMe();
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { user, setUser, loading, setLoading, handleRegister, handleLogin, handleLogout, handleGetMe };
}