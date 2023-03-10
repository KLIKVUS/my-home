import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import { ProtectedRoute as PR } from "../components/ProtectedRoute";
import AdminMenu from './Admin/Menu';
import AdminLogin from './Admin/Login';
import Main, { useMainLoader } from "./User/Main";


export const useRoutes = (isAuth) => {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<Main />}
                    loader={useMainLoader}
                />
                <Route path="/admin">
                    <Route index element={<Navigate to="/admin/login" replace={true} />} />
                    <Route path="login" element={<PR isAuth={!isAuth} redirectUrl="/admin/menu"><AdminLogin /></PR>} />
                    <Route path="menu" element={<PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>} />
                    <Route path="projects" element={<PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>} />
                    <Route path="feedbacks" element={<PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>} />
                </Route>
                <Route path="*" element={<div>404 Error</div>} />
            </>
        )
    )
}