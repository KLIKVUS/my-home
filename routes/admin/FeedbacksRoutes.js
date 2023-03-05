import { Router } from "express";
import Joi from "joi";

import errorHandler from "../../helpers/errorHandler.js";
import msgHandler from "../../helpers/msgHandler.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import Feedback from "../../models/Feedback.js";

const FeedbacksRoutes = Router();


FeedbacksRoutes
    .use(adminMiddleware)
    .route("/feedbacks")
    .post(
        async (req, res) => {
            // #swagger.path = "/admin/feedbacks"
            // #swagger.description = "Allows the administrator to create a new feedback"
            // #swagger.summary = "create feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["firstName", "lastName", "text", "rating"] = {
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

            try {
                const errorHandlerResult = await errorHandler(
                    Joi.object({
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
                    }).label("Request body"),
                    400, req
                );
                if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

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
    ).put(
        async (req, res) => {
            // #swagger.path = "/admin/feedbacks"
            // #swagger.description = "Allows the administrator to edit a feedback"
            // #swagger.summary = "edit feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["_id", "firstName", "lastName", "text", "rating"] = {
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

            try {
                const errorHandlerResult = await errorHandler(
                    Joi.object({
                        _id: Joi
                            .string()
                            .empty()
                            .required(),
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
                    }).label("Request body"),
                    400, req
                );
                if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

                const { _id, firstName, lastName, text, rating } = req.body;
                await Feedback.findByIdAndUpdate({ _id }, { firstName, lastName, text, rating });

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: "Feedback is updated"
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    ).delete(
        async (_, res) => {
            // #swagger.path = "/admin/feedbacks"
            // #swagger.description = "Allows the administrator to delete a feedback"
            // #swagger.summary = "delete feedback"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["_id"] = {
                in: "body",
                description: "Delete feedback",
                type: "object",
                required: true,
                schema: {
                    _id: "string"
                }
            } */
            /* #swagger.responses[200] = {
                description: "Result info",
                schema: {
                    $ref: "#/definitions/Response"
                }
            } */

            try {
                const errorHandlerResult = await errorHandler(
                    Joi.object({
                        _id: Joi
                            .string()
                            .empty()
                            .required()
                    }).label("Request body"),
                    400, req
                );
                if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

                const { _id } = req.body;
                await Feedback.findByIdAndDelete({ _id });

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: ""
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    )

export default FeedbacksRoutes;