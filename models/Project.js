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
const Project = model("Project", schema);

export default Project;