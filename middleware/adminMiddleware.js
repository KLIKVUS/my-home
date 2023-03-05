import jwt from "jsonwebtoken";
import config from "config";

import msgHandler from "../helpers/msgHandler.js";
import User from "../models/User.js";
import { updateTokens } from "../helpers/tokens.js";


async function adminMiddleware(req, res, next) {
    if (req.method === "OPTIONS") return next();

    try {
        const { accessToken, refreshToken } = req.signedCookies;
        if (accessToken) {
            const decoded = jwt.verify(accessToken, config.get("jwt.secret"));
            const user = await User.findById(decoded.userId);

            req.user = user;
            // if (!user) throw Error;

            return next();
        } else if (refreshToken) {
            const decoded = jwt.verify(refreshToken, config.get("jwt.secret"));
            const user = await User.findOne({ tokenId: decoded.id });
            const { accessToken, refreshToken } = await updateTokens(candidate._id);

            req.user = user;
            req.userTokens = { accessToken, refreshToken };

            return next();
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