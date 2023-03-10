import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useRoutes } from "./routes";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/auth.hook";


function App() {
    const { login, logout, accessToken, refreshToken } = useAuth();
    const isAuth = !!accessToken;
    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, isAuth }}>
            <CookiesProvider>
                <RouterProvider router={routes} />
                <ToastContainer />
            </CookiesProvider>
        </AuthContext.Provider>
    );
}

export default App;
