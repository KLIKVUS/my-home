import jwt from "jsonwebtoken";
import config from "config";

import msgHandler from "../helpers/msgHandler.js";
import User from "../models/User.js";


async function adminMiddleware(req, res, next) {
    if (req.method === "OPTIONS") return next();

    try {
        const { accessToken, refreshToken } = req.cookies;
        if (accessToken) {
            console.log(accessToken);
            const decoded = jwt.verify(accessToken, config.get("jwt.secret"));
            const user = await User.findById(decoded.userId);

            req.user = user;
            // if (!user) throw Error;

            return next();
        } else if (refreshToken) {

        }

        return res
            .status(401)
            .json(
                await msgHandler({
                    statusCod: 401,
                    message: "Authorization needed."
                })
            );
    } catch {
        return res
            .status(400)
            .json(
                await msgHandler({
                    statusCod: 400,
                    message: "The accessToken is invalid."
                })
            );
    }
}

export default adminMiddleware;