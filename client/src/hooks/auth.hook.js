import { useState, useCallback, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";


export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [cookies, , removeCookie] = useCookies(["accessToken", "refreshToken"]);

    const login = useCallback(() => {
        const cookies = new Cookies();
        setAccessToken(cookies.get("accessToken"));
        setRefreshToken(cookies.get("refreshToken"));
    }, [cookies.accessToken, cookies.refreshToken])

    const logout = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        removeCookie("accessToken");
        removeCookie("refreshToken");
    }, [removeCookie])

    useEffect(() => {
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        if (accessToken && refreshToken) login();
    }, [cookies.accessToken, cookies.refreshToken, login])


    return { login, logout, accessToken, refreshToken }
}