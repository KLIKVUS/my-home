const { Schema, model } = require("mongoose");

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
    }
}, { versionKey: false })
const userModel = model("User", schema);

userModel.findOne({ "login": "admin" }, (err, result) => {
    if (!err && !result) {
        console.log("-- We are create default user 'admin' with password 'admin'");
        const newUser = new userModel({ "login": "admin", "password": "$2y$10$mmkMyvuFJJ.l9zT.1j2Xx.3jV25LlU2.lqOkDk4xhG9YictTVSYDW", "role": "admin" });
        newUser.save();
    }
})

module.exports = userModel;