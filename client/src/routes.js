import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";

import { ProtectedRoute as PR } from "./components/ProtectedRoute";
import AdminMenu from './pages/Admin/Menu';
import AdminLogin from './pages/Admin/Login';


export const useRoutes = (isAuth) => {
    return (
        createBrowserRouter([
            {
                path: "/",
                element: <>Главная</>,
                errorElement: <div>404 Error</div>
            },
            {
                path: "/admin",
                element: <Navigate to="/admin/login" replace={true} />
            },
            {
                path: "/admin/login",
                element: <PR isAuth={!isAuth} redirectUrl="/admin/menu"><AdminLogin /></PR>
            },
            {
                path: "/admin/menu",
                element: <PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>
            }
        ])
    )
}