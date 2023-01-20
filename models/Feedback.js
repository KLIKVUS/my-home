const { Schema, model } = require("mongoose");

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
        default: 10
    }
}, { versionKey: false })

module.exports = model("Feedback", schema);