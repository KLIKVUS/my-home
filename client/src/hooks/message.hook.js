import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";


export const useMessage = () => {
    const toastDefaultSettings = useMemo(() => ({
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    }), [])

    const errorMessage = useCallback((text) => {
        if (text) toast.error(text, toastDefaultSettings);
    }, [toastDefaultSettings])

    const promiseMessage = useCallback((func) => {
        const resolveWithSomeData = new Promise(resolve => resolve(func()));

        return toast.promise(
            resolveWithSomeData,
            {
                pending: "Promise is pending.",
                success: {
                    render({ data }) {
                        return data.message
                    }
                },
                error: {
                    render({ data }) {
                        return data.message
                    }
                }
            }, toastDefaultSettings);
    }, [toastDefaultSettings])

    return { errorMessage, promiseMessage }
}