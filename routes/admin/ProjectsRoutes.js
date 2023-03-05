import { Router } from "express";
import Joi from "joi";

import msgHandler from "../../helpers/msgHandler.js";
import errorHandler from "../../helpers/errorHandler.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import Project from "../../models/Project.js";

const ProjectsRoutes = Router();


ProjectsRoutes
    .use(adminMiddleware)
    .route("/projects")
    .post(
        async (req, res) => {
            // #swagger.path = "/admin/projects"
            // #swagger.description = "Allows the administrator to create a new project"
            // #swagger.summary = "create project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["title", "description", "img"] = {
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
                Joi.object({
                    title: Joi
                        .string()
                        .empty()
                        .required(),
                    description: Joi.string(),
                    img: Joi.string()
                }).label("Request body"),
                400, req
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
    ).put(
        async (req, res) => {
            // #swagger.path = "/admin/projects"
            // #swagger.description = "Allows the administrator to edit a project"
            // #swagger.summary = "edit project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id", "title", "description", "img"] = {
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
                    _id: Joi
                        .string()
                        .empty()
                        .required(),
                    title: Joi
                        .string()
                        .empty()
                        .required(),
                    description: Joi.string(),
                    img: Joi.string()
                }).label("Request body"),
                400, req
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            try {
                const { _id, title, description, img } = req.body;
                await Project.findByIdAndUpdate({ _id }, { title, description, img });

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
            // #swagger.path = "/admin/projects"
            // #swagger.description = "Allows the administrator to delete a project"
            // #swagger.summary = "delete project"
            // #swagger.tags = ["Admin"]
            /* #swagger.parameters["id"] = {
                in: "body",
                description: "Deleted project id",
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

            try {
                const { _id } = req.body;
                await Project.findByIdAndDelete({ _id });

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