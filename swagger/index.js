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
        AdminAuth: {
            login: "admin",
            password: "admin"
        },
        Project: {
            title: "New Project",
            description: "Project desc",
            img: "img link"
        },
        Feedback: {
            firstName: "Test",
            lastName: "Person",
            text: "test text",
            rating: 5
        },
        Response: {
            status: "string",
            statusCod: "number",
            message: "string"
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
let endpointsFiles = [
    join(_dirname, "../routes/admin/AuthRoutes.js"),
    join(_dirname, "../routes/admin/ProjectsRoutes.js"),
    join(_dirname, "../routes/admin/FeedbacksRoutes.js"),
    join(_dirname, "../routes/user/ProjectsRoutes.js"),
    join(_dirname, "../routes/user/FeedbacksRoutes.js"),
];


swaggerAutogen({
    autoQuery: false,
    autoBody: false
})(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`);
})