import { Schema, model } from "mongoose";

const schema = new Schema({
    "title": {
        type: String,
        require: true
    },
    "description": {
        type: String,
        default: ""
    },
    "img": {
        type: String,
        default: ""
    },
    "likes": {
        type: Number,
        default: 0
    }
}, { versionKey: false })

export default model("Project", schema);