import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My-home API",
        description: "API for my portfolio page"
    },
    definitions: {
        Admin: {
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
const adminRoutes = ["AuthRoutes.js"];
let endpointsFiles = [];

for (let route of adminRoutes) {
    endpointsFiles.push(join(_dirname, `../routes/admin/${route}`));
}


swaggerAutogen()(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`);
})