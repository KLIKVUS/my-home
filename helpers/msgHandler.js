async function msgHandler({ status = "OK", statusCod = 200, message, data = undefined }) {
    if (statusCod < 200 && statusCod > 299) statusCod = "NOT OK";
    return {
        status,
        statusCod,
        ...(data && { data }),
        message
    }
}

export default msgHandler;