import { Router } from "express";

import msgHandler from "../../helpers/msgHandler.js";
import Project from "../../models/Project.js";

const ProjectsRoutes = Router();


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

export default ProjectsRoutes;