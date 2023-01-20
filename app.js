require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

require("./models")

const PORT = process.env.PORT;
const app = express();


app.use(express.json({ extended: true }));

try {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (e) {
    console.log("-- Server Error. \n" + e.message);
    process.exit(1);
}

app.listen(PORT, (e) => {
    if (e) return console.error("-- Boss we have error \n error msg:", e);
    return console.log(`-- Server listening on ${PORT} PORT`);
})