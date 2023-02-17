import { Router } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import config from "config";

import * as User from "../../models/User.js";
import msgHandler from "../../helpers/msg.js";
import { generateAccessToken, generateRefreshToken, updateTokens } from "../../helpers/tokens.js";

const AuthRouter = Router();
const defaultCookieOptions = {
    signed: true,
    path: "/admin",
    secure: true,
    sameSite: "Strict"
}
// const { generateRefreshToken, generateAccessToken, updateTokens } = tokens;


async function errorHandler(dataSchema, statusCod, req) {
    try {
        await dataSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
        return await msgHandler({ statusCod, message: err.message });
    }
}

AuthRouter.post(
    "/auth/login",
    async (req, res) => {
        // #swagger.description = "Admin login"
        // #swagger.summary = "authenticate"
        // #swagger.operationId = "authenticateUsingPOST"
        /* #swagger.parameters["login", "password"] = {
            in: "body",
            description: "Authorization",
            type: "object",
            required: true,
            schema: {
                "login": "string",
                "password": "string"
            }
        } */
        /* #swagger.responses[200] = {
            description: "Result info and cookies",
            schema: {
                "accessToken": "string",
                "refreshToken": "string"
            }
        } */

        const errorHandlerResult = await errorHandler(
            Joi.object({
                login: Joi
                    .string()
                    .empty()
                    .required(),
                password: Joi
                    .string()
                    .empty()
                    .required()
            }).label("Request body"),
            400, req
        );
        if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json(await msgHandler({ statusCod: 400, message: "The user was not found." }));
            }

            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(await msgHandler({ statusCod: 400, message: "Invalid password." }));
            }

            const { accessToken, refreshToken } = await updateTokens(user._id);
            res
                .cookie("accessToken", accessToken, {
                    maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.accessCookie.expiresIn"))),
                    ...defaultCookieOptions
                })
                .cookie("refreshToken", refreshToken, {
                    maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.refreshCookie.expiresIn"))),
                    ...defaultCookieOptions
                })
                .json(
                    await msgHandler({
                        statusCod: 200,
                        message: "The user is found."
                    })
                );
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

AuthRouter.post(
    "/auth/register",
    async (req, res) => {
        // #swagger.description = "Admin login"
        // #swagger.summary = "authenticate"
        // #swagger.operationId = "authenticateUsingPOST_1"
        /* #swagger.parameters["login", "password"] = {
            in: "body",
            description: "Authorization",
            type: "object",
            required: true,
            schema: {
                "login": "string",
                "password": "string"
            }
        } */
        /* #swagger.responses[200] = {
            description: "Result info and cookies",
            schema: {
                "accessToken": "string",
                "refreshToken": "string"
            }
        } */

        const errorHandlerResult = await errorHandler(
            Joi.object({
                login: Joi.string().empty().required(),
                password: Joi.string().empty().required().min(8).max(30)
            }).label("Request body"),
            400, req
        );
        if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

        try {
            const { login, password } = req.body;
            const candidate = await User.findOne({ login });
            if (candidate) {
                return res.status(400).json(await msgHandler({ statusCod: 400, message: "Such a user already exists." }));
            }

            const salt = await bcryptjs.genSalt(config.get("bcrypt.saltRounds"));
            const hashedPassword = await bcryptjs.hash(password, salt);
            const refreshToken = generateRefreshToken();
            const user = new User({ login, password: hashedPassword, tokenId: refreshToken.id });
            await user.save();

            const accessToken = generateAccessToken(user._id);
            res
                .cookie("accessToken", accessToken, {
                    maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.accessCookie.expiresIn"))),
                    ...defaultCookieOptions
                })
                .cookie("refreshToken", refreshToken.token, {
                    maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.refreshCookie.expiresIn"))),
                    ...defaultCookieOptions
                })
                .status(201)
                .json(await msgHandler({
                    statusCod: 201,
                    message: "The user is found."
                }));
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

AuthRouter.post(
    "/auth/refresh",
    async (req, res) => {
        // #swagger.description = "Admin login"
        // #swagger.summary = "authorization"
        // #swagger.operationId = "authenticateUsingPOST_2"
        /* #swagger.parameters["login", "password"] = {
            in: "body",
            description: "Authorization",
            type: "object",
            required: true,
            schema: {
                "refreshToken": "string"
            }
        } */
        /* #swagger.responses[200] = {
            description: "Result info and cookies",
            schema: {
                "accessToken": "string",
                "refreshToken": "string"
            }
        } */

        const errorHandlerResult = await errorHandler(
            Joi.object({
                refreshToken: Joi.string().empty().required(),
            }).label("Request body"),
            400, req
        );
        if (errorHandlerResult) return res.status(400).json(errorHandlerResult);

        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                jwt.verify(refreshToken, config.get("jwt.secret"), async (err, decoded) => {
                    if (decoded.type !== "refresh" || err instanceof jwt.JsonWebTokenError) {
                        return res.status(400).json(await msgHandler({ statusCod: 400, message: "Invalid token." }));
                    } else if (err instanceof jwt.TokenExpiredError) {
                        return res.status(400).json(await msgHandler({ statusCod: 400, message: "The token has expired." }));
                    }

                    const candidate = await User.findOne({ tokenId: decoded.id });
                    if (!candidate) {
                        return res.status(400).json(await msgHandler({ statusCod: 400, message: "Invalid token." }));
                    }
                    const { accessToken, refreshToken } = await updateTokens(candidate._id);

                    res
                        .cookie("accessToken", accessToken, {
                            maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.accessCookie.expiresIn"))),
                            ...defaultCookieOptions
                        })
                        .cookie("refreshToken", refreshToken, {
                            maxAge: new Date(Date.now() + ((24 * 60 * 60 * 1000) * config.get("cookie.refreshCookie.expiresIn"))),
                            ...defaultCookieOptions
                        })
                        .status(200)
                        .json(await msgHandler({
                            statusCod: 200,
                            message: "Tokens have been updated."
                        }));
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json(await msgHandler({ statusCod: 500, message: "Server error." }));
        }
    }
)

export default AuthRouter;