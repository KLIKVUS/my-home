import msgHandler from "./msgHandler.js";

async function errorHandler(dataSchema, validationData, statusCod) {
    try {
        await dataSchema.validateAsync(validationData, { abortEarly: false });
    } catch (err) {
        return await msgHandler({ statusCod, message: err.message });
    }
}

export default errorHandler;