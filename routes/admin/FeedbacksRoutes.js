import { query, Router } from "express";
import Joi from "joi";
import mongoose from "mongoose";

import errorHandler from "../../helpers/errorHandler.js";
import msgHandler from "../../helpers/msgHandler.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import Feedback from "../../models/Feedback.js";

const FeedbacksRoutes = Router();
const bodyJoiData = {
    firstName: Joi
        .string()
        .empty()
        .required(),
    lastName: Joi
        .string()
        .empty()
        .required(),
    text: Joi
        .string()
        .empty()
        .required(),
    rating: Joi
        .number()
        .empty()
        .min(1)
        .max(10)
}
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


FeedbacksRoutes
    .use(adminMiddleware)
    .route("/feedback")
    .post(
        async (req, res) => {
            // #swagger.path = "/admin/feedback"
            // #swagger.description = "Allows the administrator to create a new feedback"
            // #swagger.summary = "create feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["data"] = {
                in: "body",
                description: "New feedback data",
                type: "object",
                required: true,
                schema: {
                    firstName: "Test",
                    lastName: "Person",
                    text: "test text",
                    rating: 5
                }
            } */
            /* #swagger.responses[201] = {
                description: "Result info",
                schema: {
                    $ref: "#/definitions/Response"
                }
            } */

            const errorHandlerResult = await errorHandler(
                Joi.object(bodyJoiData).label("Request body"),
                req.body, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            try {
                const { firstName, lastName, text, rating } = req.body;
                const newFeedback = new Feedback({ firstName, lastName, text, rating });
                await newFeedback.save();

                return res
                    .status(201)
                    .json(await msgHandler({
                        statusCod: 201,
                        message: "Feedback is created."
                    }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    )

FeedbacksRoutes
    .use(adminMiddleware)
    .route("/feedback/:id")
    .put(
        async (req, res) => {
            // #swagger.path = "/admin/feedback/:id"
            // #swagger.description = "Allows the administrator to edit a feedback"
            // #swagger.summary = "edit feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id"] = {
                in: "path",
                description: "Deleted project id",
                required: true
            } */
            /* #swagger.parameters["data"] = {
                in: "body",
                description: "Edited feedback data",
                type: "object",
                required: true,
                schema: {
                    $ref: "#/definitions/Feedback"
                }
            } */
            /* #swagger.responses[200] = {
                description: "Result info",
                schema: {
                    $ref: "#/definitions/Response"
                }
            } */

            const errorHandlerResult = await errorHandler(
                Joi.object({
                    params: paramsJoiData,
                    body: bodyJoiData
                }).label("Request data"),
                { params: req.params, body: req.body }, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            try {
                const { id } = req.params;
                const { firstName, lastName, text, rating } = req.body;
                await Feedback.findByIdAndUpdate(id, { firstName, lastName, text, rating });

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: "Feedback is updated."
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    ).delete(
        async (_, res) => {
            // #swagger.path = "/admin/feedbacks/:id"
            // #swagger.description = "Allows the administrator to delete a feedback"
            // #swagger.summary = "delete feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id"] = {
                in: "path",
                description: "Deleted feedback id",
                required: true
            } */
            /* #swagger.responses[200] = {
                description: "Result info",
                schema: {
                    $ref: "#/definitions/Response"
                }
            } */

            const errorHandlerResult = await errorHandler(
                Joi.object(paramsJoiData).label("Request params"),
                req.params, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            try {
                const { id } = req.query;
                await Feedback.findByIdAndDelete(id);

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: "Feedback is deleted."
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    )

export default FeedbacksRoutes;