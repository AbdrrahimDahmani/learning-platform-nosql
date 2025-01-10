const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Platform API",
      version: "1.0.0",
      description: "API documentation for the Learning Platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Adjusted path to ensure it points to the route files
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
