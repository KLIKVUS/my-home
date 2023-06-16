import { Router } from "express";
import Joi from "joi";
import mongoose from "mongoose";

import msgHandler from "../../helpers/msgHandler.js";
import Project from "../../models/Project.js";
import errorHandler from "../../helpers/errorHandler.js";

const ProjectsRoutes = Router();
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


ProjectsRoutes.get(
    "/projects",
    async (_, res) => {
        // #swagger.path = "/projects"
        // #swagger.description = "Get projects"
        // #swagger.summary = "get projects"
        // #swagger.tags = ["User"]
        /* #swagger.responses[200] = {
            description: "Result info",
            schema: [{
                $ref: "#/definitions/Response"
            }]
        } */
        try {
            const projects = await Project.find();
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: projects.length ? "Projects have been found." : "Projects have been found, but now they are missing.",
                    data: projects
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

ProjectsRoutes.get(
    "/project/:id",
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
        const errorHandlerResult = await errorHandler(
            Joi.object(paramsJoiData).label("Request params"),
            req.params, 400
        );
        if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

        try {
            const { id } = req.params;
            const { title, description, implementedFeatures, link } = await Project.findById(id);
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: "Project have been found.",
                    data: { title, description, implementedFeatures, link }
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

ProjectsRoutes.patch(
    "/project/:id/like",
    async (req, res) => {
        // #swagger.path = "/project/:id/like"
        // #swagger.description = "Like project"
        // #swagger.summary = "like project"
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
        const errorHandlerResult = await errorHandler(
            Joi.object(paramsJoiData).label("Request params"),
            req.params, 400
        );
        if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

        try {
            const { id } = req.params;
            await Project.findByIdAndUpdate(id, { $inc: { likes: 1 } });
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: "You like a project!"
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

export default ProjectsRoutes;