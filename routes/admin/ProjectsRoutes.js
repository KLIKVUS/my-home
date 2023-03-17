import { Router } from "express";
import Joi from "joi";
import mongoose from "mongoose";

import msgHandler from "../../helpers/msgHandler.js";
import errorHandler from "../../helpers/errorHandler.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import Project from "../../models/Project.js";

const ProjectsRoutes = Router();
const bodyJoiData = {
    title: Joi
        .string()
        .empty()
        .required(),
    description: Joi.string(),
    img: Joi.string()
}
const queryJoiData = {
    id: Joi
        .string()
        .empty()
        .required()
        .custom((value, helper) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidId) return helper.message("\"query.id\" is invalid");
            return true;
        })
}


ProjectsRoutes
    .use(adminMiddleware)
    .route("/project")
    .post(
        async (req, res) => {
            // #swagger.path = "/admin/project"
            // #swagger.description = "Allows the administrator to create a new project"
            // #swagger.summary = "create project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["data"] = {
                in: "body",
                description: "New project data",
                type: "object",
                required: true,
                schema: {
                    title: "New Project",
                    description: "Project desc",
                    img: "img link"
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
                const { title, description, img } = req.body;
                const project = new Project({ title, description, img });
                await project.save();

                return res
                    .status(201)
                    .json(await msgHandler({
                        statusCod: 201,
                        message: "The project is created."
                    }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    )

ProjectsRoutes
    .use(adminMiddleware)
    .route("/project/:id")
    .put(
        async (req, res) => {
            // #swagger.path = "/admin/projects/:id"
            // #swagger.description = "Allows the administrator to edit a project"
            // #swagger.summary = "edit project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id"] = {
                description: "Edited project id",
                required: true
            } */
            /* #swagger.parameters["data"] = {
                in: "body",
                description: "Edited project data",
                type: "object",
                required: true,
                schema: {
                    $ref: "#/definitions/Project"
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
                    query: queryJoiData,
                    body: bodyJoiData
                }).label("Request data"),
                { query: req.query, body: req.body }, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult)

            try {
                const { id } = req.query;
                const { title, description, img } = req.body;
                await Project.findByIdAndUpdate(id, { title, description, img });

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: "The project is updated."
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    ).delete(
        async (req, res) => {
            // #swagger.path = "/admin/projects/:id"
            // #swagger.description = "Allows the administrator to delete a project"
            // #swagger.summary = "delete project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id"] = {
                description: "Deleted project id",
                required: true
            } */
            /* #swagger.responses[200] = {
                description: "Result info",
                schema: {
                    $ref: "#/definitions/Response"
                }
            } */

            const errorHandlerResult = await errorHandler(
                Joi.object(queryJoiData).label("Request query"),
                req.query, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            try {
                const { id } = req.query;
                await Project.findByIdAndDelete(id);

                return res.json(await msgHandler({
                    statusCod: 200,
                    message: "The project is deleted."
                }));
            } catch (e) {
                console.log(e);
                res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
            }
        }
    )

export default ProjectsRoutes;