import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import { ProtectedRoute as PR } from "../components/ProtectedRoute";
import AdminMenu from './Admin/Menu';
import AdminLogin from './Admin/Login';
import Projects from "./Admin/Projects";
import Feedbacks from "./Admin/Feedbacks/index.js";
import { useLoader } from "../hooks/loader.hook";
import { useAction } from "../hooks/action.hook";
import FormContainer from "../components/FormContainer";
import { ProjectEditForm, ProjectCreateForm } from "../components/ProjectForms";
import { FeedbackEditForm, FeedbackCreateForm } from "../components/FeedbackForms";
import UserPage from "./User";
import pagesHeaderText from "../context/pagesHeaderText";
import CardsWrapper from "../components/CardsWrapper";
import ProjectCard from "../components/ProjectCard";
import FeedbackCard from "../components/FeedbackCard";
import About from "./User/About";


export const useRoutes = (isAuth) => {
    const { projectsLoader, projectLoader, feedbacksLoader, feedbackLoader } = useLoader();
    const { deleteProjectAction, deleteFeedbackAction } = useAction();

    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<UserPage />} handle={pagesHeaderText.index}>
                    <Route path="/works" element={<CardsWrapper Card={ProjectCard} />} handle={pagesHeaderText.works} loader={projectsLoader} />
                    <Route path="/feedbacks" element={<CardsWrapper Card={FeedbackCard} />} handle={pagesHeaderText.feedbacks} loader={feedbacksLoader} />
                    <Route path="/about" element={<CardsWrapper><About /></CardsWrapper>} handle={pagesHeaderText.about} />
                </Route>
                <Route path="/admin">
                    <Route index element={<Navigate to="/admin/login" replace={true} />} />

                    <Route path="login" element={<PR isAuth={!isAuth} redirectUrl="/admin/projects"><AdminLogin /></PR>} />
                    <Route path="menu" element={<PR isAuth={isAuth} redirectUrl="/admin/login"><AdminMenu /></PR>} />

                    <Route element={<AdminMenu />}>
                        <Route
                            path="projects"
                            element={<PR isAuth={isAuth} redirectUrl="/admin/login"><Projects /></PR>}
                            loader={projectsLoader}
                        >
                            <Route
                                path="create"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><FormContainer apiUrl={"/api/admin/project"} Form={ProjectCreateForm} formName={"create"} method="POST" /></PR>}
                                children
                            />
                            <Route
                                path=":projectId/edit"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><FormContainer apiUrl={"/api/admin/project/"} Form={ProjectEditForm} formName={"edit"} /></PR>}
                                loader={projectLoader}
                                children
                            />
                            <Route
                                path=":projectId/delete"
                                element={"loading"} //add loading
                                action={async ({ params }) => {
                                    await deleteProjectAction(params.projectId);
                                    return null;
                                }}
                                children
                            />
                        </Route>
                        <Route
                            path="feedbacks"
                            element={<PR isAuth={isAuth} redirectUrl="/admin/login"><Feedbacks /></PR>}
                            loader={feedbacksLoader}
                        >
                            <Route
                                path="create"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><FormContainer apiUrl={"/api/admin/feedback"} Form={FeedbackCreateForm} formName={"create"} method="POST" /></PR>}
                                children
                            />
                            <Route
                                path=":feedbackId/edit"
                                element={<PR isAuth={isAuth} redirectUrl="/admin/login"><FormContainer apiUrl={"/api/admin/feedback/"} Form={FeedbackEditForm} /></PR>}
                                loader={feedbackLoader}
                            />
                            <Route
                                path=":feedbackId/delete"
                                element={"loading"} //add loading
                                action={async ({ params }) => {
                                    await deleteFeedbackAction(params.feedbackId);
                                    return null;
                                }}
                                children
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<div>404 Error</div>} />
            </>
        )
    )
}