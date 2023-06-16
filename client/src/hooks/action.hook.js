import { useEffect } from "react";
import { redirect } from "react-router-dom";

import { useMessage } from "../hooks/message.hook";
import { useHttp } from "./http.hook";


export const useAction = () => {
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();

    const deleteProjectAction = async (id) => {
        try {
            await message.promiseMessage(request.bind(null, `/api/admin/project/${id}`, "DELETE"));
            redirect("..");
        } catch { }
    }
    
    const deleteFeedbackAction = async (id) => {
        try {
            await message.promiseMessage(request.bind(null, `/api/admin/feedback/${id}`, "DELETE"));
            redirect("..");
        } catch { }
    }

    useEffect(() => {
        clearError();
    }, [error, message, clearError])

    return { loading, deleteProjectAction, deleteFeedbackAction }
}