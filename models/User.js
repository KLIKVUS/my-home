import { Schema, model } from "mongoose";

const schema = new Schema({
    "login": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        enum: ["admin", "editor"],
        default: "editor"
    },
    "tokenId": {
        type: String,
        required: true
    }
}, { versionKey: false })
const User = model("User", schema);

export default User;