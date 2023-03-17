import { Router } from "express";
import Joi from "joi";
import mongoose from "mongoose";

import msgHandler from "../../helpers/msgHandler.js";
import Project from "../../models/Project.js";
import errorHandler from "../../helpers/errorHandler.js";

const ProjectsRoutes = Router();
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
                Joi.object(queryJoiData).label("Request data"),
                req.query, 400
            );
            if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

            const { id } = req.query;
            const { description, img, title } = await Project.findById(id);
            return res.json(
                await msgHandler({
                    statusCod: 200,
                    message: "Project have been found.",
                    data: { description, img, title }
                })
            );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

export default ProjectsRoutes;