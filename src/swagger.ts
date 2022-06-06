import { Express } from "express";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const Swagger = (app: Express) => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Api do Quarto Digital",
      description:
        "Api do Quarto Digital, utilizada para acessar os dados do quarto digital, feita com o nodejs e o express",
      version: "1.0.0",
      servers: [
        {
          url: "http://localhost:4003",
          description: "Development server",
        },
        {
          url: "https://quarto-digital.herokuapp.com/",
          description: "Production server",
        },
      ],
    },
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./src/routes/*.ts"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
