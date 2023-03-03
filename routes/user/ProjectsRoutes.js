import { Router } from "express";

import msgHandler from "../../helpers/msgHandler.js";
import Project from "../../models/Project.js";

const ProjectsRoutes = Router();


ProjectsRoutes.get(
    "/projects/get",
    async (_, res) => {
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