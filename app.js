import config from "config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import "./helpers/createDefaultUser.js";
import AdminRoutes from "./routes/admin/index.js";
import UserRoutes from "./routes/user/index.js";

const PORT = config.get("port");
const app = express();
const swaggerFile = JSON.parse(fs.readFileSync("./swagger/output.json"))


app
    .use(express.json({ extended: true }))
    .use(cookieParser(config.get("cookie.secret")));

app.get("/", (_, res) => res.redirect("/api/doc"));

app.use("/api/", ...UserRoutes);
app.use("/api/admin", ...AdminRoutes);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

try {
    mongoose.set("strictQuery", true)
    mongoose.connect(config.get("mongoURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (e) {
    console.log("-- Server Error. \n" + e.message);
    process.exit(1);
}

app.listen(PORT, (e) => {
    if (e) return console.error("-- Boss we have error \n error msg:", e);
    return console.log(`-- Server listening on PORT ${PORT}`);
})