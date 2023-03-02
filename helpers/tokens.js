import config from "config";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function generateAccessToken(userId) {
    const payload = {
        userId,
        type: config.get("jwt.access.type")
    }
    const options = { expiresIn: config.get("jwt.access.expiresIn") }
    return jwt.sign(payload, config.get("jwt.secret"), options);
}

function generateRefreshToken() {
    const payload = {
        id: new Types.ObjectId(),
        type: config.get("jwt.refresh.type")
    }
    const options = { expiresIn: config.get("jwt.refresh.expiresIn") }

    return {
        id: payload.id,
        token: jwt.sign(payload, config.get("jwt.secret"), options)
    }
}

async function updateTokens(userId) {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();

    await User.updateOne({ userId }, { tokenId: refreshToken.id });

    return {
        accessToken,
        refreshToken: refreshToken.token
    }
}

export { generateAccessToken, generateRefreshToken, updateTokens };