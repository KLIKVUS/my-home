import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, redirectUrl, children }) => {
    if (!isAuth) return <Navigate to={redirectUrl} replace={true} />;
    return children;
};