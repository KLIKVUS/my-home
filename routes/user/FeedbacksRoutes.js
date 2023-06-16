import { Router } from "express";
import Joi from "joi";
import mongoose from "mongoose";

import msgHandler from "../../helpers/msgHandler.js";
import Feedback from "../../models/Feedback.js";
import errorHandler from "../../helpers/errorHandler.js";

const FeedbacksRoutes = Router();
const paramsJoiData = {
    id: Joi
        .string()
        .empty()
        .required()
        .custom((value, helper) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidId) return helper.message("\"params.id\" is invalid");
            return true;
        })
}


FeedbacksRoutes.get(
    "/feedbacks",
    async (_, res) => {
        // #swagger.path = "/feedbacks"
        // #swagger.description = "Get feedbacks"
        // #swagger.summary = "get feedbacks"
        // #swagger.tags = ["User"]
        /* #swagger.responses[200] = {
            description: "Result info",
            schema: [{
                $ref: "#/definitions/Response"
            }]
        } */

        try {
            const feedbacks = await Feedback.find();
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: feedbacks.length ? "Feedbacks have been found." : "Feedbacks have been found, but now they are missing.",
                    data: feedbacks
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

FeedbacksRoutes.get(
    "/feedback/:id",
    async (req, res) => {
        // #swagger.path = "/project/:id"
        // #swagger.description = "Get project"
        // #swagger.summary = "get project"
        // #swagger.tags = ["User"]
        /* #swagger.parameters["id"] = {
                in: "path",
                description: "Project id",
                required: true
            } */
        /* #swagger.responses[200] = {
            description: "Result info",
            schema: [{
                $ref: "#/definitions/Response"
            }]
        } */
        try {
            const errorHandlerResult = await errorHandler(
                Joi.object(paramsJoiData).label("Request params"),
                req.params, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            const { id } = req.params;
            const { lastName, firstName, text, rating } = await Feedback.findById(id);
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: "Feedback have been found.",
                    data: { lastName, firstName, text, rating }
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

export default FeedbacksRoutes;