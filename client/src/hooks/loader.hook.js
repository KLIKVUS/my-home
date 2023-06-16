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
        const project = await request(`/api/project/${params.projectId}`);
        return { id: params.projectId, ...project.data };
    }, [request])

    const feedbacksLoader = useCallback(async () => {
        const feedbacks = await request("/api/feedbacks");
        return feedbacks.data;
    }, [request])

    const feedbackLoader = useCallback(async ({ params }) => {
        const feedback = await request(`/api/feedback/${params.feedbackId}`);
        return { id: params.feedbackId, ...feedback.data };
    }, [request])

    return { projectsLoader, projectLoader, feedbacksLoader, feedbackLoader }
}