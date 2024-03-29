import { Schema, model } from "mongoose";

const schema = new Schema({
    "firstName": {
        type: String,
        require: true
    },
    "lastName": {
        type: String,
        require: true
    },
    "text": {
        type: String,
        require: true
    },
    "rating": {
        type: Number,
        min: 0,
        max: 10,
        default: 10
    }
}, { versionKey: false })
const Feedback = model("Feedback", schema);

export default Feedback;