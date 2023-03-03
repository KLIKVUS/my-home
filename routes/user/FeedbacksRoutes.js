import { Router } from "express";

import msgHandler from "../../helpers/msgHandler.js";
import Feedback from "../../models/Feedback.js";

const FeedbacksRoutes = Router();


FeedbacksRoutes.get(
    "/feedbacks/get",
    async (_, res) => {
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

export default FeedbacksRoutes;