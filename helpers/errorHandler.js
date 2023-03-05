import msgHandler from "./msgHandler.js";

async function errorHandler(dataSchema, statusCod, req) {
    try {
        await dataSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
        return await msgHandler({ statusCod, message: err.message });
    }
}

export default errorHandler;