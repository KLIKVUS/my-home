import { useState, useCallback, useEffect, useMemo } from "react";
import { Cookies } from "react-cookie";


export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const cookies = useMemo(() => new Cookies(), []);

    const login = useCallback(() => {
        setAccessToken(cookies.get("accessToken") || null);
        setRefreshToken(cookies.get("refreshToken") || null);
    }, [cookies])

    const logout = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
    }, [cookies])

    useEffect(login, [login])

    return { login, logout, accessToken, refreshToken }
}