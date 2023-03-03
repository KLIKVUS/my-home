import { Types } from "mongoose";
import config from "config";
import bcryptjs from "bcryptjs";

import User from "../models/User.js";

const { login: defaultLogin, password: defaultPassword } = config.get("defaultUser");


User.findOne({ "login": "admin" }, async (err, result) => {
    if (!err && !result) {
        const salt = await bcryptjs.genSalt(config.get("bcrypt.saltRounds"));
        const hashedPassword = await bcryptjs.hash(defaultPassword, salt);
        const user = new User({
            "login": defaultLogin,
            "password": hashedPassword,
            "role": "admin",
            "tokenId": new Types.ObjectId()
        });
        await user.save();
        console.log(`-- We are create default user '${defaultLogin}' with password '${defaultPassword}'`);
    }
})