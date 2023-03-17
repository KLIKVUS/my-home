import { useState, useCallback, useEffect, useMemo } from "react";
import { Cookies } from "react-cookie";


export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const cookies = useMemo(() => new Cookies(), []);

    const login = useCallback(() => {
        setAccessToken(cookies.get("accessToken"));
        setRefreshToken(cookies.get("refreshToken"));
    }, [cookies])

    const logout = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
    }, [cookies])

    useEffect(() => {
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        if (accessToken && refreshToken) login();
    }, [cookies.accessToken, cookies.refreshToken, login])


    return { login, logout, accessToken, refreshToken }
}