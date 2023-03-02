import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My-home API",
        description: "API for my portfolio page"
    },
    tags: [
        {
            name: "Admin",
            description: "These are only for special users!"
        },
        {
            name: "User",
            description: "These are only for users!"
        }
    ],
    definitions: {
        AdminAuthData: {
            login: "admin",
            password: "admin"
        }
    },
    securityDefinitions: {
        accessToken: {
            type: "apiKey",
            in: "cookie",
            name: "accessToken",
            description: "Need to get access"
        },
        refreshToken: {
            type: "apiKey",
            in: "cookie",
            name: "refreshToken",
            description: "Need to refresh tokens"
        }
    },
    host: "localhost:8080/api",
    schemes: ["http"]
}

const _dirname = dirname(fileURLToPath(import.meta.url));

const outputFile = join(_dirname, "output.json");
let endpointsFiles = ["./routes/admin/AuthRoutes.js"];


swaggerAutogen()(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`);
})