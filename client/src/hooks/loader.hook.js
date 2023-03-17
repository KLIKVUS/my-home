import { useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";


export const useLoader = () => {
    const { clearError, request } = useHttp();

    useEffect(() => {
        clearError();
    }, [clearError])

    const projectsLoader = useCallback(async () => {
        const projects = await request("/api/projects");
        return projects.data;
    }, [request])

    const projectLoader = useCallback(async ({ params }) => {
        const project = await request(`/api/project/:id?id=${params.projectId}`);
        return { id: params.projectId, data: project.data };
    }, [request])

    const feedbacksLoader = useCallback(async () => {
        const feedbacks = await request("/api/feedbacks");
        return feedbacks.data;
    }, [request])

    const feedbackLoader = useCallback(async ({ params }) => {
        const feedback = await request(`/api/feedback/:id?id=${params.feedbackId}`);
        return { id: params.feedbackId, data: feedback.data };
    }, [request])

    return { projectsLoader, projectLoader, feedbacksLoader, feedbackLoader }
}