import { useState, useCallback, useRef } from "react";


export const useHttp = () => {
    const loading = useRef(false);
    const error = useRef(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        loading.current = true;
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Request Error!")
            }

            loading.current = false;

            return data;
        } catch (e) {
            loading.current = false;
            error.current = e.message;
            throw e;
        }
    }, [])

    const clearError = useCallback(() => error.current = null, [])

    return { loading, request, error, clearError }
}