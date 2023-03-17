import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import { ProtectedRoute as PR } from "../components/ProtectedRoute";
import AdminMenu from './Admin/Menu';
import AdminLogin from './Admin/Login';
import Main from "./User/Main";
import Projects from "./Admin/Projects";
import Feedbacks from "./Admin/Feedbacks.js";
import { useLoader } from "../hooks/loader.hook";
import EditFormContainer from "../components/EditFormContainer";
import ProjectEditForm from "../components/ProjectEditForm";
import FeedbackEditForm from "../components/FeedbackEditForm";


export const useRoutes = (isAuth) => {
    const { projectsLoader, projectLoader, feedbacksLoader, feedbackLoader } = useLoader();

    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<Main />}
                    loader={async () => ({ projects: await projectsLoader(), feedbacks: await feedbacksLoader() })}
                />
                <Route path="/admin">
                    <Route index element={<Navigate to="/admin/login" replace={true} />} />

                    <Route path="login" element={<PR isAuth={!isAuth} redirectUrl="/admin/menu"><AdminLogin /></PR>} />
                    <Route path="menu" element={<PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>} />

                    <Route element={<AdminMenu />}>
                        <Route
                            path="projects"
                            element={<PR isAuth={isAuth} redirectUrl="/admin/login"><Projects /></PR>}
                            loader={projectsLoader}
                        >
                            <Route
                                path=":projectId/edit"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><EditFormContainer apiUrl={"/api/admin/project/"} EditForm={ProjectEditForm} /></PR>}
                                loader={projectLoader}
                            />
                        </Route>
                        <Route
                            path="feedbacks"
                            element={<PR isAuth={isAuth} redirectUrl="/admin/login"><Feedbacks /></PR>}
                            loader={feedbacksLoader}
                        >
                            <Route
                                path=":feedbackId/edit"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><EditFormContainer apiUrl={"/api/admin/feedback/"} EditForm={FeedbackEditForm} /></PR>}
                                loader={feedbackLoader}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<div>404 Error</div>} />
            </>
        )
    )
}